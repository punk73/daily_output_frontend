Ext.define('helloext.store.Daily_outputs', { //parameter pertama harus sesuai filepath
    extend: 'Ext.data.Store',
    model: 'helloext.model.Daily_output',
    autoLoad:true,
    autoSync: true,
    // pageSize: 7,
    remoteSort: true,
    
    proxy: {
        type: 'rest',
        enablePaging:true,
        extraParams: {
            tanggal: new Date().getFullYear() + "-" + new Date().getMonth() + 1 + "-" + new Date().getDate(),
            shift: 'A',
            line_name: 1,
            username: function (){
                if (localStorage.getItem('user') != null){
                   return  JSON.parse( localStorage.getItem('user')).id
                }else{
                    return null
                }
            }
          },  
        url: 'http://localhost/daily_output/public/api/daily_outputs',
        reader:{
            root: 'data',
            type: 'json',
            totalProperty: 'total'
        }
    },

    onCreateRecords: function(records, operation, success) {
        // console.log({records, operation, success});
    },

    onUpdateRecords: function(records, operation, success) {
        // console.log({records, operation, success});
    },

    onDestroyRecords: function(records, operation, success) {
        // console.log({records, operation, success});
    },

});