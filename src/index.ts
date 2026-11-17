// Deploy-button test Worker: proves D1 binding, applied migration, secret and cron
// trigger all arrive working after a one-click deploy. Not the real app.
interface Env {
  DB: D1Database
  PASSWORD: string
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (!env.PASSWORD) return Response.json({ ok: false, error: 'PASSWORD secret is not set' }, { status: 500 })
    if (request.headers.get('authorization') !== `Bearer ${env.PASSWORD}`) {
      return Response.json({ ok: false, error: 'unauthorized' }, { status: 401 })
    }
    const feeds = await env.DB.prepare('SELECT COUNT(*) AS n FROM feeds').first<{ n: number }>()
    const ticks = await env.DB.prepare('SELECT COUNT(*) AS n FROM ticks').first<{ n: number }>()
    return Response.json({ ok: true, migrationApplied: true, feeds: feeds?.n ?? 0, cronTicks: ticks?.n ?? 0 })
  },

  async scheduled(_controller: ScheduledController, env: Env): Promise<void> {
    await env.DB.prepare('INSERT INTO ticks DEFAULT VALUES').run()
  },
}
