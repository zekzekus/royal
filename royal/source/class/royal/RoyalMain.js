/*******************************************************************************
 #asset(royal/*)
 ******************************************************************************/
qx.Class.define("royal.RoyalMain", {
	extend : qx.ui.container.Composite,
	construct : function () {
		this.base(arguments);
		
		var zlayout = new qx.ui.layout.Dock();
		zlayout.setSeparatorY("separator-vertical");
		this.setLayout(zlayout);
		
		this.add(this.__makeHeader(), {edge : "north"});
		this.add(this.__makeTopMenu(), {edge : "north"});
		
		var horizontalSplitPane = new qx.ui.splitpane.Pane();
		this.add(horizontalSplitPane);

		var menuTree = this.__makeTree();
		menuTree.setWidth(250);
		horizontalSplitPane.add(menuTree, 0);
		
		var verticalSplitPane = new qx.ui.splitpane.Pane("vertical");
		verticalSplitPane.setDecorator(null);
		horizontalSplitPane.add(verticalSplitPane, 1);
		
		this.__appFrame = this.__makeIFrame();
		verticalSplitPane.add(this.__appFrame, 0);
	},
	members : {
		__makeHeader : function () {
			var headerComposite = new qx.ui.container.Composite();
			headerComposite.setLayout(new qx.ui.layout.HBox());
			headerComposite.setAppearance("app-header");

			headerComposite.add(new qx.ui.basic.Label("Royal: WareHouse Management System by ILS"));
			headerComposite.add(new qx.ui.core.Spacer(), {flex : 1});
			return headerComposite;			
		},
		__makeTopMenu : function () {
			var topMenuBar = new qx.ui.menubar.MenuBar();

			var toolsMenu = new qx.ui.menu.Menu();
			toolsMenu.add(new qx.ui.menu.Button("Select Company"));

			var fileButton = new qx.ui.menubar.Button("File");
			var toolsButton = new qx.ui.menubar.Button("Tools");
			var windowButton = new qx.ui.menubar.Button("Window");
			var aboutButton = new qx.ui.menubar.Button("About");
			topMenuBar.add(fileButton);
			topMenuBar.add(toolsButton);
			topMenuBar.add(windowButton);
			topMenuBar.add(aboutButton);
			return topMenuBar;			
		},
		__makeTree : function () {
			var myTree = new qx.ui.tree.Tree();
			myTree.setBackgroundColor("white");
			myTree.setWidth(200);
			myTree.setOpenMode("click")

			// Add the root folder
			myTree._root = new qx.ui.tree.TreeFolder("root");
			myTree._root.setOpen(true);
			myTree.setHideRoot(true);
			myTree.setRootOpenClose(true);
			myTree.setRoot(myTree._root);

			// Add the subfolders
			myTree._mainFolder = new qx.ui.tree.TreeFolder(myTree.tr("Main"));
			myTree._mainSetupFolder = new qx.ui.tree.TreeFolder(myTree.tr("Setup"));
			myTree._mainSetupItemsFolder = new qx.ui.tree.TreeFolder(myTree.tr("Items"));
			myTree._mainSetupItemsFamily = new qx.ui.tree.TreeFile(myTree.tr("Family"));
            myTree._mainSetupItemsFamily.setEnabled(false);
			myTree._mainSetupItemsBrand = new qx.ui.tree.TreeFile(myTree.tr("Brand"));
            myTree._mainSetupItemsBrand.setEnabled(false);
			myTree._mainSetupItemsGroup = new qx.ui.tree.TreeFile(myTree.tr("Group"));
            myTree._mainSetupItemsGroup.setEnabled(false);
			myTree._mainSetupItemsFolder.add(
				myTree._mainSetupItemsFamily,
				myTree._mainSetupItemsBrand, 
				myTree._mainSetupItemsGroup);
			myTree._mainSetupAddressingFolder = new qx.ui.tree.TreeFolder(myTree.tr("Addressing"));
			myTree._mainSetupAddressingLoc = new qx.ui.tree.TreeFile(myTree.tr("Create Locations"));
            myTree._mainSetupAddressingLoc.setEnabled(false);
			myTree._mainSetupAddressingTHM = new qx.ui.tree.TreeFile(myTree.tr("Create THM"));
            myTree._mainSetupAddressingTHM.setEnabled(false);
			myTree._mainSetupAddressingFolder.add(
				myTree._mainSetupAddressingLoc,
				myTree._mainSetupAddressingTHM);
			myTree._mainSetupFolder.add(
				myTree._mainSetupItemsFolder, 
				myTree._mainSetupAddressingFolder);
			myTree._mainInquiriesFolder = new qx.ui.tree.TreeFolder(myTree.tr("Inquiries"));
			myTree._mainReportsFolder = new qx.ui.tree.TreeFolder(myTree.tr("Reports"));
			myTree._mainFolder.add(
				myTree._mainSetupFolder,
				myTree._mainInquiriesFolder, 
				myTree._mainReportsFolder);

			myTree._frontOfficeFolder = new qx.ui.tree.TreeFolder(myTree.tr("Front Office"));
			myTree._goodsInFolder = new qx.ui.tree.TreeFolder(myTree.tr("Goods In"));
            myTree._goodsInFolder.setOpen(true);
			myTree._goodsInFolderGoodsIn = new qx.ui.tree.TreeFile(myTree.tr("Goods In Orders"));
			myTree._goodsInFolderGoodsIn.setUserData("app", "royalGoodsIn");
			myTree._goodsInFolderRampOpe = new qx.ui.tree.TreeFile(myTree.tr("Ramp Operations"));
            myTree._goodsInFolderRampOpe.setEnabled(false);
			myTree._goodsInFolderPyhsica = new qx.ui.tree.TreeFile(myTree.tr("Pyhsical Counting"));
            myTree._goodsInFolderPyhsica.setEnabled(false);
			myTree._goodsInFolderInquiri = new qx.ui.tree.TreeFile(myTree.tr("Inquiries"));
            myTree._goodsInFolderInquiri.setEnabled(false);
			myTree._goodsInFolderReports = new qx.ui.tree.TreeFile(myTree.tr("Reports"));
            myTree._goodsInFolderReports.setEnabled(false);
			myTree._goodsInFolder.add(
				myTree._goodsInFolderGoodsIn,
				myTree._goodsInFolderRampOpe,
				myTree._goodsInFolderPyhsica,
				myTree._goodsInFolderInquiri,
				myTree._goodsInFolderReports);
			myTree._goodsOutFolder = new qx.ui.tree.TreeFolder(myTree.tr("Goods Out"));
            myTree._goodsOutFolder.setOpen(true);
            myTree._goodsOutFolderGoodsOut = new qx.ui.tree.TreeFile(myTree.tr("Goods Out Orders"));
            myTree._goodsOutFolderGoodsOut.setUserData("app", "royalGoodsOut");
            myTree._goodsOutFolderInquiri = new qx.ui.tree.TreeFile(myTree.tr("Inquiries"));
            myTree._goodsOutFolderInquiri.setEnabled(false);
            myTree._goodsOutFolderReports = new qx.ui.tree.TreeFile(myTree.tr("Reports"));
            myTree._goodsOutFolderReports.setEnabled(false);
            myTree._goodsOutFolder.add(
                myTree._goodsOutFolderGoodsOut,
                myTree._goodsOutFolderInquiri,
                myTree._goodsOutFolderReports);
			myTree._inventoryFolder = new qx.ui.tree.TreeFolder(myTree.tr("Inventory"));
            myTree._inventoryFolder.setOpen(true);
            myTree._inventoryInvent = new qx.ui.tree.TreeFile(myTree.tr("Inventory List"));
            myTree._inventoryInvent.setUserData("app", "royalInventory");
            myTree._inventoryArtSum = new qx.ui.tree.TreeFile(myTree.tr("Article Summary"));
            myTree._inventoryArtSum.setUserData("app", "articleHistory");
            myTree._inventoryFolder.add(
                myTree._inventoryInvent,
                myTree._inventoryArtSum);
            myTree._administratorFolder = new qx.ui.tree.TreeFolder(myTree.tr("Administrator"));

			myTree.getRoot().add(
				myTree._mainFolder, 
				myTree._frontOfficeFolder,
				myTree._goodsInFolder, 
				myTree._goodsOutFolder,
				myTree._inventoryFolder, 
				myTree._administratorFolder);

			myTree.addListener("changeSelection", 
				function (e) {
					var app = e.getData()[0].getUserData("app");
					qx.log.Logger.debug(app);
					if (app) {
						if (this.isProd()) {
							this.selectedUrl = "../" + app + "/index.html";
						} else {
							this.selectedUrl = "../../" + app + "/source/index.html";
						}
					} else {
						this.selectedUrl = null;
					}
				}, this);
			myTree.addListener("dblclick", 
				function(e) {
					qx.event.Timer.once(
						function () {
							if (this.selectedUrl != null) {
								if (this.__appFrame.getSource() == this.selectedUrl) {
									this.__appFrame.reload();
								} else {
									this.__appFrame.setSource(this.selectedUrl);
								}
							}
						}, this, 50);
				}, this);

			return myTree;
		},
		__makeIFrame : function () {
			var iframe = new qx.ui.embed.Iframe();
			iframe.addListener("load", 
				function () {
					qx.log.Logger.debug("iframe loaded");
				}, this);

			return iframe;			
		},
		isProd : function () {
			if (qx.core.Variant.isSet("qx.debug", "on")) {
				return false;
			}
			return true;
		}
	}		
});