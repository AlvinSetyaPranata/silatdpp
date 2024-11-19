'use client'

import { useAuth } from '@/hooks/auth'
import Loading from '@/app/(app)/Loading'
import Sidebar from '@/components/Sidebar'

const AppLayout = ({ children }) => {
    // const { user } = useAuth({ middleware: 'auth' })

    // if (!user) {
    //     return <Loading />
    // }

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Sidebar />
            <main className='flex-1'>{children}</main>
        </div>
    )
}

export default AppLayout
