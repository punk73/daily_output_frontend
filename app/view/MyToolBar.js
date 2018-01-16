Ext.define("helloext.view.MyToolBar", {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.MyToolBar',
    xtype: 'basic-toolbar',
    items: [
        {
            xtype:'button',
            id: 'btnAdd',
            text: 'Add' 
        }, '-', 
        {
            xtype:'button',
            id:'btnDelete',
            text: 'Delete'
        }, '-',
        {
            xtype: 'datefield',
            id: 'tanggal',
            format: 'Y-m-d',          
            allowBlank: true,
            emptyText:'yyyy-mm-dd',
            value: new Date(),
            fieldLabel:'Tanggal'
            //renderer: formatDate
        }, '-',
        {   
            text: 'comboShift',
            xtype: 'combo',
            fieldLabel:'Shift',
            labelPad: 15,
            store: 'comboShifts',
            emptyText : 'Shift',
            id: 'comboShift',
            displayField:'name',
            valueField:'name',
            queryMode: 'local',
            forceSelection: true,
            value:'A'
        },
        {
            text: 'Line',
            xtype: 'combo',
            fieldLabel:'Line',
            store: 'lines',
            emptyText : 'lines',
            id: 'comboLine',
            displayField:'name',
            valueField:'name',
            queryMode: 'local',
            forceSelection: true,
            value:'1'
            
        }

    ]
});