import getGoodsType from '@/components/goods/getGoodsType';
import getGoods from '@/components/goods/getGoods';
export default [
    {
        path:'/getGoodsType',
        meta:{
            isAuthorization:true
        },
        component:getGoodsType
    },
    {
        path:'/getGoods',
        meta:{
            isAuthorization:true
        },
        component:getGoods
    }
]