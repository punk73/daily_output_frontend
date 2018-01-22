Ext.define('helloext.Application', {
    name: 'helloext',
    
    extend: 'Ext.app.Application',
    
    requires: [
        'Ext.container.Viewport',
        'Ext.form.Panel',
        'Ext.data.proxy.Rest',
        'Ext.toolbar.Paging',
        'Ext.grid.plugin.CellEditing',
        'Ext.ux.ProgressBarPager',
        'Ext.grid.RowNumberer',
        'Ext.grid.plugin.RowEditing',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.grid.feature.Summary',
        'helloext.view.Viewport'
        // 'KitchenSink.model.Company'
     ],

    views: [
        // TODO: add views here
        /*'user.ActionPanel',*/
        'Create',
        'daily_output_grid',
        'RegisterUser',
        'MyToolBar',
        'DownloadView'
    ],

    controllers: [
        'Main',
        'Daily_outputs',
        'MyToolBar',
        'DownloadViewController',
    ],

    //Collection
    stores: [
        'Daily_outputs',
        'timeCombos', //untuk combobox time 06-07 dll
        'comboShifts', //untuk combobox shift
        'lines' //untuk combobox lines
    ],

    //model
    models:[
        /*'User'*/
        'Daily_output',
        'timeCombo'
    ],

    hostname: 'localhost',

    getCurrentUser: function (token){
       Ext.Ajax.request({
            url: 'http://'+MySharedData.hostname+'/daily_output/public/api/auth/me',
            method: 'GET',
            params: {token: token},
            success: function (form, action){
                // console.log({form: form, action: action})
                // var user = JSON.parse(form.responseText )
                localStorage.setItem('user', form.responseText )
            },

            failure: function (form, action){
                console.log({form: form, action: action})
            }
        }) 
    },

    launch: function() {
        //ambil token dari localStorage
        var token = MySharedData.getToken(); //ambil token dari global variable
        var self = this;
        //cek apa token tsb msh aktif atau engga,
        Ext.Ajax.request({
            url: 'http://'+MySharedData.hostname+'/daily_output/public/api/protected',
            method: 'GET',
            params: {token: token},
            success: function (form, action){
                //kalau aktif, masuk/
                self.getCurrentUser(token); //untuk get current user

                Ext.create('Ext.container.Container', {
                    items: [
                        {   
                            xtype:'daily_output_grid',

                            title: 'Daily output controll',
                            
                            tbar:[{
                                xtype: 'MyToolBar'  
                            }],

                            bbar: {
                                xtype: 'pagingtoolbar',
                                pageSize: 50,
                                store: 'Daily_outputs',
                                emptyMsg: 'Sorry, No Records Are Available At The Moment.',   
                                displayInfo: true,
                                plugins: new Ext.ux.ProgressBarPager()
                            },
                            
                            height: 600,
                        }
                    ],
                    renderTo: "mainPanel"
                    // renderTo: Ext.getBody()
                });
            },

            failure: function (form, action){
                //kalau engga, masuk login
                Ext.create('helloext.view.Viewport', {
                    id: 'viewport'
                });
            }
        })   
    }

});
