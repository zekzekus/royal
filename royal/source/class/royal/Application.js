/*******************************************************************************
 * #asset(royal/*)
 ******************************************************************************/

qx.Class.define("royal.Application", {
	extend : qx.application.Standalone,
	members : {
		main : function() {
			this.base(arguments);

			if (qx.core.Variant.isSet("qx.debug", "on")) {
				qx.log.appender.Native;
				qx.log.appender.Console;
			}
			this.mainViewer = new royal.RoyalMain();
 			this.getRoot().add(this.mainViewer, {edge : 0});
		}
	},
	destruct : function () {
		this._disposeObjects("mainViewer");
	}
});
