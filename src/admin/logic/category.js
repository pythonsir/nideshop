module.exports = class extends think.Logic {
  indexAction() {
    this.allowMethods = 'post';
    this.rules = {
      name: {  string: true, trim:true },
      is_show: { required: true, int: true },
      currentPage:{ required:true, int:true },
      pageSize:{ required:true, int:true }
    };
  }

  saveCategoryAction(){

    this.allowMethods = 'post';
    this.rules ={
       name: { required: true, string: true, trim:true },
       keywords: {  string: true, trim:true },
       parentId: {  required: true,int: true, trim:true },
       frontName: {  string: true, trim:true },
       frontDesc: {  string: true, trim:true },
       sortOrder: {  int: true, trim:true },
       showIndex: {  int: true, trim:true }, 
       bannerUrl:{  string: true, trim:true },
       iconUrl:{  string: true, trim:true },
       imgUrl:{  string: true, trim:true },
       wapBannerUrl:{  string: true, trim:true }
    }
  }

  saveEditorCategoryAction(){

    this.allowMethods = 'post'

    this.rules = {
      id:{ required: true, int: true },
      name: { required: true, string: true, trim:true },
      keywords: {  string: true, trim:true },
      parentId: {  required: true,int: true, trim:true },
      frontName: {  string: true, trim:true },
      frontDesc: {  string: true, trim:true },
      sortOrder: {  int: true, trim:true },
      showIndex: {  int: true, trim:true }, 
      bannerUrl:{  string: true, trim:true },
      iconUrl:{  string: true, trim:true },
      imgUrl:{  string: true, trim:true },
      wapBannerUrl:{  string: true, trim:true }
   }

  }


  infoAction(){
    this.allowMethods = 'post';
    this.rules = {
      id:  { required: true, int: true, trim:true }
    }


  }

  deleteCategory(){
    this.allowMethods = 'post';

    this.rules = {
      ids:{required:true,string:true,trim:true}
    }

  }


};
