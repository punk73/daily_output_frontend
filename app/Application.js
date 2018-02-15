Ext.define('helloext.Application', {
    name: 'helloext',
    
    extend: 'Ext.app.Application',
    
    requires: [
        'helloext.util.Config',
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
        'helloext.view.Viewport',
        'Ext.chart.axis.Category',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric'

     ],

    views: [
        // TODO: add views here
        /*'user.ActionPanel',*/
        'loginView',
        'Create',
        'daily_output_grid',
        'RegisterUser',
        'MyToolBar',
        'DownloadView',
        'chart.delay_type',
        'chart.target_output',
        'indexToolbarView',
        'daily_lost_time.grid',
        'daily_lost_time.toolbar'
        
    ],

    controllers: [
        'Main',
        'Daily_outputs',
        'MyToolBar',
        'DownloadViewController',
        'indexToolbarController',
        'Daily_lost_time_toolbar'
    ],

    //Collection
    stores: [
        'Daily_outputs',
        'timeCombos', //untuk combobox time 06-07 dll
        'comboShifts', //untuk combobox shift
        'lines', //untuk combobox lines
        'Lost_times'
    ],

    //model
    models:[
        /*'User'*/
        'Daily_output',
        'Lost_time',
        'timeCombo'
    ],

    getCurrentUser: function (token){
       Ext.Ajax.request({
            url: 'http://'+helloext.util.Config.hostname()+'/daily_output/public/api/auth/me',
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
        var token = helloext.util.Config.getToken(); //ambil token dari global variable
        var self = this;
        //cek apa token tsb msh aktif atau engga,
        Ext.Ajax.request({
            url: 'http://'+helloext.util.Config.hostname()+'/daily_output/public/api/protected',
            method: 'GET',
            params: {token: token},
            success: function (form, action){
                //kalau aktif, masuk/
                self.getCurrentUser(token); //untuk get current user

                Ext.create('Ext.tab.Panel', {
                    title: 'DAILY OUTPUT CONTROL',
                    
                    items: [
                        {   
                            title: 'Home',
                            bodyPadding : 10,
                            xtype:'daily_output_grid',
                            
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
                            
                            height: 550
                        },
                        {
                            title: 'DAILY LOST TIME',
                            bodyPadding : 10,
                            xtype: 'daily_lost_time_grid',
                            height: 550
                        }/*,
                        {
                            title: 'Std Man Power',
                            xtype: 'std_man_power',
                            height: 550
                        }*/
                    ],
                    renderTo: "mainPanel"
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
