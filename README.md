# feed-reader-deploy-test

Throwaway test of the "Deploy to Cloudflare" button for a small Worker with a D1 database,
a migration, a secret and an hourly cron trigger. It is not a real app.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/ameer-h/feed-reader-deploy-test)

After deploying, call the Worker with `Authorization: Bearer <your PASSWORD>`. It reports
`migrationApplied: true` once the database migration has run.
