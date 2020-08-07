import { css } from 'linaria'
import { utilities } from './theme-system'

export default css`
  :global() {
    ${utilities};
  }
`
