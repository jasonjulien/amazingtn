import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })
console.log('DATABASE_URL:', process.env.DATABASE_URL)

async function test() {
  console.log('🔌 Connecting...')
  
  const { default: config } = await import('../payload.config')
  console.log('Config imported!')
  
  const { getPayload } = await import('payload')
  const payload = await getPayload({ config })
  console.log('✅ Payload ready!')
  
  process.exit(0)
}

test().catch(err => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})