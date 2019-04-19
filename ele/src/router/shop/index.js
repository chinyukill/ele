import getShopType from '@/components/shop/getShopType'
import getShop from '@/components/shop/getShop'
export default [
    {
        path:'/getShopType',
        meta:{
            isAuthorization:true
        },
        component:getShopType
    },
    {
        path:'/getShop',
        meta:{
            isAuthorization:true
        },
        component:getShop
    }
]