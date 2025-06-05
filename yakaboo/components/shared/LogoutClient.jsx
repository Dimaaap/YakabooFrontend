import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CookiesWorker, LocalStorageWorker } from '../../services'
import Endpoints from '../../endpoints'
import { useRedirectAfterLogoutStore } from '../../states'

export const LogoutClient = () => {

  const router = useRouter()
  const { setIsRedirectAfterLogout } = useRedirectAfterLogoutStore();

  useEffect(() => {
    const logoutUser = async() => {
        const refreshToken = CookiesWorker.get("refresh_token");

        if(refreshToken){
            try{
                await fetch(Endpoints.USER_LOGOUT, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${refreshToken}`
                    },
                })
            } catch(error){
                console.warn('Logout request failed. Proceeding anyway.')
            }
        }

        [
            'access_token',
            'refresh_token',
            'token_type',
            'email',
            'phone_number',
            'first_name',
            'last_name',
            'birth_date',
            'is_login',
        ].forEach(CookiesWorker.delete)

        LocalStorageWorker.set('is_auth', 'false')
        LocalStorageWorker.delete('auth_expires')

        setIsRedirectAfterLogout(true)
        router.push('/')
    }

    logoutUser()
  }, [router, setIsRedirectAfterLogout])

  return null
}

