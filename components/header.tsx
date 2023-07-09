import Link from 'next/link'
import { Box, Button } from '@mui/material'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import { auth } from '../initFirebase'
import Image from 'next/image'
import styles from '@/styles/Header.module.css'
import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import ShareIcon from '@mui/icons-material/Share'
import ReplyIcon from '@mui/icons-material/Reply'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'

const Header = () => {
  const router = useRouter()

  const handleLogout = async () => {
    await signOut(auth)
    await router.push('/login')
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <header>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className={styles.header_content}>
        <div className="logo">
          <Link href="/">
            <Image src="/crosscoaching_white_logo.png" alt="Logo" width={160} height={100} priority />
          </Link>
        </div>
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <Image src="/hamburger-menu.png" alt="Logo" width={24} height={24} priority/>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>
              <QuestionAnswerIcon color="action" className="mr-4" />
              <Link href={"/questions"}>
                セルフコーチング
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ShareIcon color="action" className="mr-4" />
              <Link href={"/shares"}>
                シェア
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ReplyIcon color="action" className="mr-4" />
              <Link href={"/feedbacks"}>
                フィードバック
              </Link>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <AccountCircleIcon color="action" className="mr-4" />
              <Link href={"/profile"}>
                プロフィール設定
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <LogoutIcon color="action" className="mr-4" />
              <button type="submit" onClick={handleLogout}>
                ログアウト
              </button>
            </MenuItem>
          </Menu>
        </div>
      </Box>
    </header>
  )
}

export default Header
