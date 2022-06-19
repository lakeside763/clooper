## Getting Started
- Setup env.local enviroment variable using env.local.sample.

To run the application locally:
```bash
yarn start
this will start both the application and the cronjob.
```

To run the cronjob script:
```
yarn cron-job
```

## API Url
- http://localhost:8000/


## Created API
 - localhost: 8000/property/get-properties/ - GET
 - localhost: 8000/property/create-property/ - POST
 - localhost: 8000/property/update-property/ - PUT
 - localhost: 8000/property/publish-property/ - PUT
 - localhost: 8000/property/delete-property/id - DELETE