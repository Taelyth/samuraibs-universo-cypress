const { defineConfig } = require("cypress");
require('dotenv').config()

module.exports = defineConfig({

  e2e: {
    setupNodeEvents(on, config) {
      
      const  { Pool } = require('pg')
      // implement node event listeners here
      const pool = new Pool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        port: process.env.PORT
      })
      
      on('task', {
        removeUser(email) {
          return new Promise(function(resolve){
            pool.query('DELETE FROM public.users WHERE email = $1', [email], function(error, result) {
              if (error) {
                throw error
              }
              resolve({success: result})
            })
          })
        },
        findToken(email){
          return new Promise(function(resolve){
            pool.query('SELECT t.token FROM public.users u INNER JOIN public.user_tokens t ' +
            'ON u.id = t.user_id ' +
            'WHERE u.email = $1 '+
            'ORDER BY t.created_at DESC', [email], function(error, result){
              if (error) {
                throw error
              }
              resolve({token: result.rows[0].token})
            })
          })
        }
      })
    
    },
  
    baseUrl: 'http://localhost:3000',
    chromeWebSecurity: false,
    testIsolation: true
  },

  viewportWidth: 1366,
  viewportHeight: 768

});
