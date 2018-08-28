const Base = require('./base.js');

module.exports = class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {

    const params = {
      name:this.post('name'),
      is_show:this.post('is_show'),
      currentPage:this.post('currentPage'),
      pageSize:this.post('pageSize')
    }

    let model = this.model('category');

    const result = await model.getlist(params);

    
    return this.success(result);
  }

  async topCategoryAction() {
    const model = this.model('category');
    const data = await model.where({parent_id: 0}).order(['id ASC']).select();

    return this.success(data);
  }

  async infoAction() {

    const id = this.post('id');
    const model = this.model('category');

    const result = await model.where({id: id}).find();

    const data ={
      id:result['id'],
      name: result['name'],
      keywords: result['keywords'],
      parentId: result['parent_id'],
      frontName: result['front_name'],
      frontDesc: result['front_desc'],
      sortOrder: result['sort_order'],
      showIndex: result['show_index'], 
      bannerUrl:result['banner_url'],
      iconUrl:result['icon_url'],
      imgUrl:result['img_url'],
      isShow:result['is_show'],
      wapBannerUrl:result['wap_banner_url']
   }

    return this.success(data);

  }

  async saveEditorCategoryAction(){

    if(!this.isPost){
      return false;
    }

    const values ={
      name: this.post('name'),
      keywords: this.post('keywords'),
      parent_id: this.post('parentId'),
      level:this.post('parentId') == 0? 'L1' : 'L2',
      front_name: this.post('frontName'),
      front_desc: this.post('frontDesc'),
      sort_order: this.post('sortOrder'),
      show_index: this.post('sortOrder'), 
      banner_url:this.post('bannerUrl'),
      icon_url:this.post('iconUrl'),
      img_url:this.post('imgUrl'),
      is_show:this.post('isShow'),
      type:0,
      wap_banner_url:this.post('wapBannerUrl')
   }

   const model = this.model('category');

   try {

    await model.where({id: this.post('id')}).update(values);

    return this.success();

  } catch (error) {

    think.logger.error(error);

    return this.fail({
      errno: 1000,
      errmsg: '服务器异常，操作失败！',
    })

  }





  }

  async saveCategoryAction(){

    if (!this.isPost) {
      return false;
    }
    
    const values ={
      name: this.post('name'),
      keywords: this.post('keywords'),
      parent_id: this.post('parentId'),
      level:this.post('parentId') == 0? 'L1' : 'L2',
      front_name: this.post('frontName'),
      front_desc: this.post('frontDesc'),
      sort_order: this.post('sortOrder'),
      show_index: this.post('sortOrder'), 
      banner_url:this.post('bannerUrl'),
      icon_url:this.post('iconUrl'),
      img_url:this.post('imgUrl'),
      type:0,
      wap_banner_url:this.post('wapBannerUrl')
   }

    const model = this.model('category');

    try {

      await model.add(values);

       return this.success();

    } catch (error) {

      think.logger.error(error);

      return this.fail({
        errno: 1000,
        errmsg: '服务器异常，操作失败！',
      })
    }
  }

  async deleteCategoryAction(){

      if (!this.isPost){
        return false
      }

      const ids = this.post('ids');

      const model = this.model('category');

      try{

      await  model.where({id:['IN',ids]}).delete()

      return this.success();

      }catch(err){
        think.logger.error(error);
        return this.error({
          errno: 1000,
          errmsg: '服务',
          data: {"flag":0}
        })
      }

  }

  async storeAction() {
    if (!this.isPost) {
      return false;
    }



    const values = this.post();
    const id = this.post('id');

    const model = this.model('category');
    values.is_show = values.is_show ? 1 : 0;
    if (id > 0) {
      await model.where({id: id}).update(values);
    } else {
      delete values.id;
      await model.add(values);
    }
    return this.success(values);
  }

  async destoryAction() {
    const id = this.post('id');
    await this.model('category').where({id: id}).limit(1).delete();
    // TODO 删除图片

    return this.success();
  }
};
