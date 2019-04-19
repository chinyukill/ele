import adminLog from '@/components/admin/adminLog'
import addAdmin from '@/components/admin/addAdmin'
import admin from '@/components/admin/admin'
import updateAdmin from '@/components/admin/updateAdmin'
export default  [
    {
      path: '/',
      name: 'adminLog',
      meta:{
        isAuthorization:true
      },
      component: adminLog
    },
    {
      path:'/addAdmin',
      meta:{
        isAuthorization:true
      },
      component:addAdmin
    },
    {
      path:'/admin',
      meta:{
        isAuthorization:true
      },
      component:admin
    },
    {
      path:'/updateAdmin',
      meta:{
        isAuthorization:true
      },
      component:updateAdmin
    }
  ]