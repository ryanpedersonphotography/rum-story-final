// src/app/api/health/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const healthData = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    deployment: {
      environment: process.env.NODE_ENV,
      region: process.env.VERCEL_REGION || 'unknown',
      commit: process.env.VERCEL_GIT_COMMIT_SHA || 'local'
    },
    checks: {
      database: 'ok', // Placeholder
      // You can add real checks here
    }
  }

  return NextResponse.json(healthData)
}