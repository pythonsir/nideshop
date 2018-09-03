module.exports = class extends think.Model{

    async getlist(param){

        const name = param['name'];
        const enabled = param['enabled'];
        const page = param['currentPage'];
        const size = param['pageSize'];
    
        let result = await this.where({ name: ['like', `%${name}%`],enabled: ['=',`${enabled}`] }).order(['id DESC']).page(page, size).countSelect();
           
        result.name = name;

        result.enabled = enabled;

        return result;


    }

   





}