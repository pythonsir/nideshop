module.exports = class extends think.Model{

    async getlist(params){

        let condition = {
            't.is_show':params['is_show']
        };

        if( params['name'] != ''){
            condition = {
                ...condition,
                't.name':params['name']
            };
         }
         let result = await this.alias('t').join({
            table: 'category',
            as: 'p',
            on: ['parent_id','id']
          }).where(condition).page(params['currentPage'],params['pageSize']).order(['t.sort_order ASC']).countSelect({
            field:'t.*,p.name as pname'
          })
         const topCategory = result.data.filter((item) => {
           return item.parent_id === 0;
         });
         const childCategory = result.data.filter((item) => {
            return item.parent_id != 0;
          });
         const categoryList = [];
         topCategory.map((item) => {
           item.level = 1;
           categoryList.push(item);
         });
         childCategory.map((item) => {
            item.level = 2;
            item.name =item.pname+' > '+item.name; 
            categoryList.push(item);
         })

         result.name = params['name'];

         result.is_show = params['is_show'];

         result.data = categoryList;
         

         return result;

    }


}