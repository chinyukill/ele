import axios from 'axios';
export default{
    state:{
        advList:[]
    },
    mutations:{
        CHANGE_ADVLIST(state,info){
            state.advList=info.advList
        }
    },
    actions:{
        addAdv({commit},{formdata,success}){
            console.log(11111)
            axios({
                url:'/addAdv',
                method:"post",
                data:formdata,
                headers:{"Content-Type":"multipart/form-data"}
            }).then((data)=>{
                // commit('CHANGE_ADVLIST',data)
                success(false,data.msg)
            })
        },
        getAdv({commit}){
            axios.get('/getAdvList').then((data)=>{
                commit('CHANGE_ADVLIST',data)
            })
        }

    }
}
