import Box from '../components/Box'
import { parse } from '../lib/theme-system'

export default function Home() {
  return (
    <div>
      <p
        className={parse({
          color: 'primary',
          fontSize: 'large',
          fontFamily: {
            _: 'body',
            md: 'heading',
          },
        })}
      >
        Using parse
      </p>
      <Box color="primary" fontSize="large" fontFamily={{ _: 'body', md: 'heading' }}>
        Using a Box component
      </Box>
    </div>
  )
}
