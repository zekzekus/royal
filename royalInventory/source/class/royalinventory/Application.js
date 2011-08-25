/*******************************************************************************
#asset(royalinventory/*)
 ******************************************************************************/

qx.Class.define("royalinventory.Application", {
	extend : qx.application.Standalone,
	members : {
		main : function() {
			this.base(arguments);

			if (qx.core.Variant.isSet("qx.debug", "on")) {
				qx.log.appender.Native;
				qx.log.appender.Console;
			}
            var scroll = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
            scroll.add(this.getSplitPaneTwoFlexSimple(), {width: "90%", height: "90%"});
            this.getRoot().add(scroll, {edge: 0});     
        },
        getSplitPaneTwoFlexSimple : function() {
            var splitpane = new qx.ui.splitpane.Pane("vertical");
            splitpane.setHeight(400);
            splitpane.setDecorator("main");

            var tabControl1 = new qx.ui.tabview.TabView("top");
            var tabControl1Master = new qx.ui.tabview.Page("List Parameters");
            tabControl1Master.setLayout(new qx.ui.layout.Grid(5, 5));
            var lblWarehouse = new qx.ui.basic.Label().set({
                content: "<strong>Warehouse</strong>", 
                rich: true});
            var lblDot = new qx.ui.basic.Label(":");
            var edtWarehouse = new qx.ui.form.SelectBox();
            edtWarehouse.setWidth(250);
            edtWarehouse.add(new qx.ui.form.ListItem(""));
            edtWarehouse.add(new qx.ui.form.ListItem("01. Electrical materials"));
            edtWarehouse.add(new qx.ui.form.ListItem("02. Mechanical materials"));
            edtWarehouse.add(new qx.ui.form.ListItem("03. Finishing & Architectural materials"));
            edtWarehouse.add(new qx.ui.form.ListItem("04. Main Warehouse (civil and hand tools)"));
            var tmpItem = new qx.ui.form.ListItem("05. Chemical Warehouse (non hazardous material)");
            edtWarehouse.add(tmpItem);
            edtWarehouse.add(new qx.ui.form.ListItem("06. Hazardous material"));
            edtWarehouse.add(new qx.ui.form.ListItem("07. Safety Warehouse"));
            edtWarehouse.add(new qx.ui.form.ListItem("08. Stationary material"));
            edtWarehouse.add(new qx.ui.form.ListItem("09. Hazardous Gas Bottles (oxygen, acetylene etc.)"));
            edtWarehouse.add(new qx.ui.form.ListItem("10. Camp mobilization materials warehouse"));
            edtWarehouse.add(new qx.ui.form.ListItem("11. Admin warehouse"));
            edtWarehouse.add(new qx.ui.form.ListItem("12. Machinery and equipment spares warehouse"));
            edtWarehouse.add(new qx.ui.form.ListItem("13. Bounded Open storage area"));
            edtWarehouse.add(new qx.ui.form.ListItem("14. Bulk cement"));
            edtWarehouse.add(new qx.ui.form.ListItem("15. Bulk Aggregates"));
            edtWarehouse.add(new qx.ui.form.ListItem("16. Fill Materials"));
            edtWarehouse.add(new qx.ui.form.ListItem("17. Bulk rebars"));
            edtWarehouse.add(new qx.ui.form.ListItem("18. Quarantina"));
            edtWarehouse.add(new qx.ui.form.ListItem("19. Rejected materials"));
            edtWarehouse.add(new qx.ui.form.ListItem("20. Scrap"));
            edtWarehouse.setSelected(tmpItem);
            tabControl1Master.add(lblWarehouse, {row: 0, column: 0});
            tabControl1Master.add(lblDot,     {row: 0, column: 1});
            tabControl1Master.add(edtWarehouse, {row: 0, column: 2});

            var lblArticle = new qx.ui.basic.Label().set({
                content: "<strong>Article Code</strong>", 
                rich: true});
            var lblDot1 = new qx.ui.basic.Label(":");
            var edtArticle = new qx.ui.form.SelectBox();
            edtArticle.add(new qx.ui.form.ListItem("1001100008  Deformed Rebar Dia 8mm."));
            edtArticle.add(new qx.ui.form.ListItem("1001100012  Deformed Rebar Dia 12mm."));
            var tmpArt = new qx.ui.form.ListItem("1322100015  Water Based Paint Red")
            edtArticle.add(tmpArt);
            edtArticle.add(new qx.ui.form.ListItem("1322100020  Water Based Paint Green"));
            edtArticle.add(new qx.ui.form.ListItem("1894200108  M8 Galv. Bolt"));
            edtArticle.add(new qx.ui.form.ListItem("1894200112  M12  Galv. Bolt"));
            edtArticle.add(new qx.ui.form.ListItem("1821100040  Safety Google Black"));
            edtArticle.add(new qx.ui.form.ListItem("1803001010  M.S. Angle 50x50x5"));            
            edtArticle.setSelected(tmpArt);
            tabControl1Master.add(lblArticle, {row: 1, column: 0});
            tabControl1Master.add(lblDot1,     {row: 1, column: 1});
            tabControl1Master.add(edtArticle, {row: 1, column: 2});

            var lblSection = new qx.ui.basic.Label().set({
                content: "<strong>Section</strong>", 
                rich: true});
            var lblDot4 = new qx.ui.basic.Label(":");
            var edtSection = new qx.ui.form.SelectBox();
            edtSection.setWidth(250);
            edtSection.add(new qx.ui.form.ListItem(""));
            edtSection.add(new qx.ui.form.ListItem("01 Amphitheater Resort Hotel 5 star 1.1.1"));
            edtSection.add(new qx.ui.form.ListItem("02 Amphitheater Apartments 1.1.2"));
            edtSection.add(new qx.ui.form.ListItem("03 Seaview Residential Apartments A 1.3.1.a"));
            edtSection.add(new qx.ui.form.ListItem("04 Seaview Residential Apartments B 1.3.2.a"));
            edtSection.add(new qx.ui.form.ListItem("05 Seaview Residential Apartments C 1.3.2.b"));
            edtSection.add(new qx.ui.form.ListItem("06 City Beach Resort Hotel 5-star 1.4.1"));
            edtSection.add(new qx.ui.form.ListItem("07 City Beach Apartments 1.4.2"));
            edtSection.add(new qx.ui.form.ListItem("08 International Village Apartments-A  1.5.2.a"));
            edtSection.add(new qx.ui.form.ListItem("09 International Village Apartments-B 1.5.2.b"));
            edtSection.add(new qx.ui.form.ListItem("10 International Village Apartments-C 1.5.2.c"));
            edtSection.add(new qx.ui.form.ListItem("11 Heritage Village Residential-A 1.5.3.a"));
            edtSection.add(new qx.ui.form.ListItem("12 Heritage Village Residential-B 1.5.3.b"));
            edtSection.add(new qx.ui.form.ListItem("13 Shopping Center and Entertainment 1.6.1"));
            edtSection.add(new qx.ui.form.ListItem("14 Fire Station 1.6.2"));
            edtSection.add(new qx.ui.form.ListItem("15 Nursery & Kindergarten 1.6.3.A"));
            edtSection.add(new qx.ui.form.ListItem("16 Primary School 1.6.3.B"));
            edtSection.add(new qx.ui.form.ListItem("17 City Hall 1.6.3.C"));
            edtSection.add(new qx.ui.form.ListItem("18 Local Health Center 1.6.3.D"));
            edtSection.add(new qx.ui.form.ListItem("19 Police Station 1.6.3.E"));
            edtSection.add(new qx.ui.form.ListItem("20 Local Mosque 1.6.3.F"));
            edtSection.add(new qx.ui.form.ListItem("21 Post Office 1.6.3.G"));
            edtSection.add(new qx.ui.form.ListItem("22 Golf Resort Hotel 5-star 1.7.1"));
            edtSection.add(new qx.ui.form.ListItem("23 Golf Course 1.7.2"));
            edtSection.add(new qx.ui.form.ListItem("24 Golf Main Club House and Retail 1.7.4"));
            edtSection.add(new qx.ui.form.ListItem("25 Golf Residence Villas-A 1.7.5.a"));
            edtSection.add(new qx.ui.form.ListItem("26 Golf Residence Villas-B 1.7.5.b"));
            edtSection.add(new qx.ui.form.ListItem("27 Golf Community-3 Apartments-A 1.7.7.a"));
            edtSection.add(new qx.ui.form.ListItem("28 Golf Community-3 Apartments-B 1.7.7.b"));
            edtSection.add(new qx.ui.form.ListItem("29 Golf Community-4 Apartments-A 1.9.1.a"));
            edtSection.add(new qx.ui.form.ListItem("30 Golf Community-4 Apartments-B 1.9.1.b"));
            edtSection.add(new qx.ui.form.ListItem("31 Golf Community-5 Apartments-A 1.9.2.a"));
            edtSection.add(new qx.ui.form.ListItem("32 Golf Community-5 Apartments-B 1.9.2.b"));
            edtSection.add(new qx.ui.form.ListItem("33 Golf Community-6 Apartments-A 1.9.3.a"));
            edtSection.add(new qx.ui.form.ListItem("34 Golf Community-6 Apartments-B 1.9.3.b"));
            edtSection.add(new qx.ui.form.ListItem("35 Golf Community-6 Apartments-C 1.9.3.c"));
            edtSection.add(new qx.ui.form.ListItem("36 Parkside Villas-A 1.10.2.a"));
            edtSection.add(new qx.ui.form.ListItem("37 Parkside Villas-B 1.10.2.b"));
            edtSection.add(new qx.ui.form.ListItem("38 Parkside Apartments-A  1.10.3.a"));
            edtSection.add(new qx.ui.form.ListItem("39 Parkside Apartments-B 1.10.3.b"));
            edtSection.add(new qx.ui.form.ListItem("40 Common Area Landscaping 11"));
            edtSection.add(new qx.ui.form.ListItem("41 Infrastructure 12"));
            tabControl1Master.add(lblSection, {row: 0, column: 3});
            tabControl1Master.add(lblDot4,     {row: 0, column: 4});
            tabControl1Master.add(edtSection, {row: 0, column: 5});            

            var btnCancel = new qx.ui.form.Button("Cancel", "royalinventory/window-close.png");
            btnCancel.setEnabled(false);
            var lblDot9 = new qx.ui.basic.Label(" ");
            var btnList = new qx.ui.form.Button("Generate List", "royalinventory/go-next.png");
            btnList.setEnabled(false);
            tabControl1Master.add(btnCancel, {row: 6, column: 7});
            tabControl1Master.add(lblDot9,     {row: 6, column: 8});
            tabControl1Master.add(btnList, {row: 6, column: 9});
            
            tabControl1.add(tabControl1Master);            
            tabControl1.setMinHeight(170);
            splitpane.add(tabControl1, 1);
            
            var tabControl2 = new qx.ui.tabview.TabView("top");
            tabControl2.setMinHeight(580);            
            var tabControl2Detail = new qx.ui.tabview.Page("Results   ");
            tabControl2Detail.setLayout(new qx.ui.layout.Canvas());
            this.detailTable = this.makeDetailTable();
            tabControl2Detail.add(this.detailTable, {width: "100%", height: "100%"});           
            tabControl2.add(tabControl2Detail);
            splitpane.add(tabControl2, 2);

            return splitpane;
        },
        getDetailData : function() {
            var detailData = [
                [1, "1322100015", "City View Residance", 100, 50, 50],
                [2, "1322100015", "Hospital", 50, 10, 40],          
                [3, "1322100015", "Beach Side Apartment", 50, 0, 50]];
            return detailData;
            
        },
        makeDetailTableModel : function() {
            var detailTableModel = new qx.ui.table.model.Simple();
            detailTableModel.setColumns(["ID", "Article", "Section", "Inbound", "Outbound", "Stock"]);
            detailTableModel.setData(this.getDetailData());

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
        }        
    }
});