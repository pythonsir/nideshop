module.exports = class extends think.Model{

    async getlist(param){

        const name = param['name'];
        const is_on_sale = param['is_on_sale'];
        const page = param['currentPage'];
        const size = param['pageSize'];
    
        let result = await this.where({ name: ['like', `%${name}%`],is_on_sale: ['=',`${is_on_sale}`] }).order(['id DESC']).page(page, size).countSelect();
           
        result.name = name;

        result.is_on_sale = is_on_sale;

        return result;

    } 




}