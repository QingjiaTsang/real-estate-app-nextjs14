import NavBar from '@/app/components/NavBar'
import UserAuthPanel from '@/app/components/UserAuthPanel'

export default function Home() {
  return (
    <div>
      <NavBar>
        <UserAuthPanel />
      </NavBar>
    </div>
  )
}
