const Db_service=require("../services/db_service")
const Controller = {
    getAllPost: () => {
        const todos=Db_service.getDbServiceInstance().getPost();
        return todos ;
    },
    getAllSearch:(codes)=>{
        const todo=Db_service.getDbServiceInstance().getSearch(codes);
        return todo ;
    },
    getAllSearchDetail:(codes)=>{
        const todo=Db_service.getDbServiceInstance().getSearchDetail(codes);
        return todo ;
    }
}
module.exports = Controller;