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
        }
      })
    
    },
  
    baseUrl: 'http://localhost:3000',
    chromeWebSecurity: false,
    testIsolation: false
  },

  viewportWidth: 1366,
  viewportHeight: 768

});
