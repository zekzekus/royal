/*******************************************************************************
#asset(royalgoodsout/*)
******************************************************************************/
qx.Class.define("royalgoodsout.Application", {
    extend : qx.application.Standalone,
    members : {
    	main : function() {
    		this.base(arguments);
    
    		if (qx.core.Variant.isSet("qx.debug", "on")) {
    				qx.log.appender.Native;
    				qx.log.appender.Console;
    			}
            this.operateWin = new qx.ui.window.Window();
            var scroll = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
            scroll.add(this.getSplitPaneTwoFlexSimple(), {width: "90%", height: "90%"});
            this.getRoot().add(scroll, {edge: 0});     
        },
        getSplitPaneTwoFlexSimple : function() {
            var splitpane = new qx.ui.splitpane.Pane("vertical");
            splitpane.setHeight(400);
            splitpane.setDecorator("main");

            var tabControl1 = new qx.ui.tabview.TabView("top");
            var tabControl1Master = new qx.ui.tabview.Page("Goods In Orders");
            tabControl1Master.setLayout(new qx.ui.layout.Canvas());
            this.masterTable = this.makeMasterTable();
            tabControl1Master.add(this.masterTable, {width: "81%", height: "100%"});
            tabControl1Master.add(this.makeButtonComposite(), {width: "15%", right: "1%", top: "1%", height: "99%"});
            tabControl1.add(tabControl1Master);
            tabControl1.setMinHeight(260);
            splitpane.add(tabControl1, 1);
            
            var tabControl2 = new qx.ui.tabview.TabView("top");
            var tabControl2Detail = new qx.ui.tabview.Page("Order Details  ");
            tabControl2Detail.setLayout(new qx.ui.layout.Canvas());
            this.detailTable = this.makeDetailTable();
            tabControl2Detail.add(this.detailTable, {width: "100%", height: "100%"});           
            tabControl2.add(tabControl2Detail);
            splitpane.add(tabControl2, 2);

            return splitpane;
        },
        getMasterData : function () {
            var masterData = [
                [1, "City View Residance", "Chemical Warehouse", "Jotun LLC", 8101, "11/29/2008"]];
            return masterData;
        },
        makeMasterTableModel : function() {
            var masterTableModel = new qx.ui.table.model.Simple();
            masterTableModel.setColumns(["ID", "Section", "Warehouse", "Vendor", "PO Number", "PO Date"]);
            masterTableModel.setData(this.getMasterData());
            return masterTableModel; 
        },
        makeMasterTable : function() {
            var tableModel = this.makeMasterTableModel();
            var custom = {
                tableColumnModel : function(obj) {
                    return new qx.ui.table.columnmodel.Resize(obj);
                }
            };
            var table = new qx.ui.table.Table(tableModel, custom);
            table.getTableColumnModel().setColumnVisible(0, false);
            table.setColumnVisibilityButtonVisible(false);
            table.setShowCellFocusIndicator(false);
            table.addListener("cellClick", this.filterDetail, this);
            
            table.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.SINGLE_SELECTION);
            table.setStatusBarVisible(false);
            return table;
        },
        getDetailData : function(id) {
            var detailData = [
                [1, "1322100015", "Water Based Paint Red, 200 Lt/drum", "drum", 50, "City View Residance"],
                [1, "1322100015", "Water Based Paint Red, 200 Lt/drum", "drum", 10, "Hospital"],          
                [1, "1322100020", "Water Based Paint Green, 200 Lt/drum", "drum", 100, "Beach Side Apartment"]];
            return detailData.filter(function(data){return data[0]==id});
            
        },
        makeDetailTableModel : function() {
            var detailTableModel = new qx.ui.table.model.Filtered();
            detailTableModel.setColumns(["ID", "Article Code", "Article Explanation", "Measure Of Unit", "Ordered Quantity", "Section"]);
            detailTableModel.setData(this.getDetailData(99));

            return detailTableModel; 
        },
        makeDetailTable : function() {
            var tableModel = this.makeDetailTableModel();
            var custom = {
                tableColumnModel : function(obj) {
                    return new qx.ui.table.columnmodel.Resize(obj);
                }
            };
            var table = new qx.ui.table.Table(tableModel, custom);
            table.getTableColumnModel().setColumnVisible(0, false);
            table.setColumnVisibilityButtonVisible(false);
            table.setShowCellFocusIndicator(false);
            table.setStatusBarVisible(false);
            
            return table;
        },
        filterDetail : function(e) {
            this.detailTable.clearSelection();
            this.detailTable.resetCellFocus();
            this.detailTable.getTableModel().setData(this.getDetailData(e.getRow() + 1));
        },
        makeButtonComposite : function()  {
            var comp = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
            var grpBox = new qx.ui.groupbox.GroupBox();
            grpBox.setLayout(new qx.ui.layout.VBox(5));
            comp.add(grpBox, {width: "100%", height: "100%"});
            var button1 = new qx.ui.form.Button("Goods Out", "royalgoodsout/go-next.png");
            button1.addListener("execute", this.execGoodsIn, this);
            var button2 = new qx.ui.form.Button("Print Data", "royalgoodsout/document-send.png");            
            var button4 = new qx.ui.form.Button("Reports", "royalgoodsout/media-eject.png");
            var button5 = new qx.ui.form.Button("Inquiries", "royalgoodsout/help-faq.png");
            var button6 = new qx.ui.form.Button("Favourites", "royalgoodsout/go-home.png");
            var button3 = new qx.ui.form.Button("Close", "royalgoodsout/window-close.png");
            button2.setEnabled(false);
            button4.setEnabled(false);
            button5.setEnabled(false);
            button6.setEnabled(false);
            button3.setEnabled(false);
            grpBox.add(button1);
            grpBox.add(button2);
            grpBox.add(button4);
            grpBox.add(button5);
            grpBox.add(button6);
            grpBox.add(button3);            

            return comp;
        },
        execGoodsIn : function(e) {
            var selection = 98;
            this.masterTable.getSelectionModel().iterateSelection(function(ind) {
                selection = ind;
            });
            selection += 1;

            if (selection == 99) {
                alert("Please choose an order");
            } else {
                this.setOperateWin(selection);                
            }
        },
        setOperateWin : function(id) {
            this.operateWin.order_id = id;
            this.operateWin.setCaption("Operate Goods Out Order");
            this.operateWin.setModal(true);
            this.operateWin.moveTo(50, 50);
            this.operateWin.setHeight(500);
            this.operateWin.setWidth(700);
            this.operateWin.setShowMinimize(false);
            this.operateWin.setShowMaximize(false);
            this.operateWin.setAllowMinimize(false);
            this.operateWin.setAllowMaximize(false);
            this.operateWin.setResizable(false);
            this.operateWin.setMovable(true);
            this.getRoot().add(this.operateWin);
            
            this.operateWin.setLayout(new qx.ui.layout.Canvas());
            this.operateWin.add(this.getSplitPaneForWin(), {width: "100%", height: "100%"});     
            
            this.operateWin.open();
        },
        getSplitPaneForWin : function() {
            var order_id = this.operateWin.order_id;
            this.masterLine = this.getMasterData().filter(function(data){return data[0]==order_id});
            var splitpane = new qx.ui.splitpane.Pane("vertical");
            splitpane.setHeight(400);
            splitpane.setDecorator("main");

            var tabControl1 = new qx.ui.tabview.TabView("top");
            var tabControl1Master = new qx.ui.tabview.Page("Goods Out Order");
            tabControl1Master.setLayout(new qx.ui.layout.HBox());
            
            var leftComposite = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));

            var lblSection = new qx.ui.basic.Label("Section");
            var lblDot = new qx.ui.basic.Label(":");
            var edtSection = new qx.ui.basic.Label().set({
                content: "<strong>" + this.masterLine[0][1] + "</strong>",
                rich: true});
            leftComposite.add(lblSection, {row: 0, column: 0});
            leftComposite.add(lblDot,     {row: 0, column: 1});
            leftComposite.add(edtSection, {row: 0, column: 2});

            var lblWarehouse = new qx.ui.basic.Label("Warehouse");
            var lblDot1 = new qx.ui.basic.Label(":");
            var edtWarehouse = new qx.ui.basic.Label().set({
                content: "<strong>" + this.masterLine[0][2] + "</strong>",
                rich: true});
            leftComposite.add(lblWarehouse, {row: 1, column: 0});
            leftComposite.add(lblDot1,     {row: 1, column: 1});
            leftComposite.add(edtWarehouse, {row: 1, column: 2});

            var lblVendor = new qx.ui.basic.Label("Vendor");
            var lblDot2 = new qx.ui.basic.Label(":");
            var edtVendor = new qx.ui.basic.Label().set({
                content: "<strong>" + this.masterLine[0][3] + "</strong>",
                rich: true});
            leftComposite.add(lblVendor, {row: 2, column: 0});
            leftComposite.add(lblDot2,     {row: 2, column: 1});
            leftComposite.add(edtVendor, {row: 2, column: 2});

            var lblPonumber = new qx.ui.basic.Label("PO Number");
            var lblDot3 = new qx.ui.basic.Label(":");
            var edtPonumber = new qx.ui.basic.Label().set({
                content: "<strong>" + this.masterLine[0][4] + "</strong>",
                rich: true});
            leftComposite.add(lblPonumber, {row: 0, column: 15});
            leftComposite.add(lblDot3,     {row: 0, column: 16});
            leftComposite.add(edtPonumber, {row: 0, column: 17});

            var lblPODate = new qx.ui.basic.Label("PO Date");
            var lblDot7 = new qx.ui.basic.Label(":");
            var edtPODate = new qx.ui.basic.Label().set({
                content: "<strong>" + this.masterLine[0][5] + "</strong>",
                rich: true});
            leftComposite.add(lblPODate, {row: 1, column: 15});
            leftComposite.add(lblDot7,     {row: 1, column: 16});
            leftComposite.add(edtPODate, {row: 1, column: 17});
            
            var lblDate = new qx.ui.basic.Label("Delivery Date");
            var lblDot4 = new qx.ui.basic.Label(":");
            var edtDate = new qx.ui.form.DateField();
            edtDate.setDate(new Date());
            leftComposite.add(lblDate, {row: 2, column: 15});
            leftComposite.add(lblDot4,     {row: 2, column: 16});
            leftComposite.add(edtDate, {row: 2, column: 17});
            
            var btnDone = new qx.ui.form.Button("Done", "royalgoodsout/go-next.png");
            var lblDot5 = new qx.ui.basic.Label(" ");
            var btnCancel = new qx.ui.form.Button("Cancel", "royalgoodsout/window-close.png");
            btnCancel.addListener("execute", function() {
                alert("Process cancelled.");
                this.operateWin.close();
            }, this);
            btnDone.addListener("execute", function() {
                alert("Order processed successfully.");
                this.operateWin.close();
            }, this);
            leftComposite.add(btnCancel, {row: 3, column: 20});
            leftComposite.add(lblDot5,     {row: 3, column: 21});
            leftComposite.add(btnDone, {row: 3, column: 22});
            
            tabControl1Master.add(leftComposite);
            tabControl1.add(tabControl1Master);
            tabControl1.setMinHeight(165);
            splitpane.add(tabControl1, 1);
            
            var tabControl2 = new qx.ui.tabview.TabView("top");
            var tabControl2Detail = new qx.ui.tabview.Page("Order Details  ");
            tabControl2Detail.setLayout(new qx.ui.layout.Canvas());
            this.detailTableWin = this.makeDetailTableWin();
            tabControl2.setMinHeight(285);
            this.detailTableWin.clearSelection();
            this.detailTableWin.resetCellFocus();
            this.detailTableWin.getTableModel().setData(this.getDetailDataWin(this.operateWin.order_id));

            tabControl2Detail.add(this.detailTableWin, {width: "100%", height: "100%"});           
            tabControl2.add(tabControl2Detail);
            splitpane.add(tabControl2, 2);

            return splitpane;            
        },
        getDetailDataWin : function(id) {
            var detailData = [
                [1, "1322100015", "Water Based Paint Red, 200 Lt/drum", "drum", 50, 50, "City View Residance"],
                [1, "1322100015", "Water Based Paint Red, 200 Lt/drum", "drum", 10, 10, "Hospital"],          
                [1, "1322100020", "Water Based Paint Green, 200 Lt/drum", "drum", 100, 100, "Beach Side Apartment"]];
            return detailData.filter(function(data){return data[0]==id});
            
        },
        makeDetailTableModelWin : function() {
            var detailTableModel = new qx.ui.table.model.Filtered();
            detailTableModel.setColumns(["ID", "Article Code", "Article Explanation", "Measure Of Unit", "Ordered Quantity", "Actual Quantity", "Section"]);
            detailTableModel.setData(this.getDetailDataWin(this.operateWin.order_id));

            return detailTableModel; 
        },
        makeDetailTableWin : function() {
            var tableModel = this.makeDetailTableModelWin();
            var custom = {
                tableColumnModel : function(obj) {
                    return new qx.ui.table.columnmodel.Resize(obj);
                }
            };
            var table = new qx.ui.table.Table(tableModel, custom);
            table.getTableColumnModel().setColumnVisible(0, false);
            table.setColumnVisibilityButtonVisible(false);
            table.setShowCellFocusIndicator(false);
            table.setStatusBarVisible(false);
            var actualRenderer = new qx.ui.table.cellrenderer.Conditional("right", "green");
            actualRenderer.addNumericCondition("!=", 48, null, "blue", null, "bold");
            actualRenderer.addNumericCondition("!=", 110, null, "blue", null, "bold");
            actualRenderer.addNumericCondition("==", 110, null, "red", null, "bold");
            actualRenderer.addNumericCondition("==", 48, null, "red", null, "bold");
            table.getTableColumnModel().setDataCellRenderer(5, actualRenderer);
            
            return table;
        }        
    }
});