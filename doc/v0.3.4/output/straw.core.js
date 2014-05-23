Ext.data.JsonP.straw_core({"tagname":"class","name":"straw.core","autodetected":{},"files":[{"filename":"straw-ios.js","href":"straw-ios.html#straw-core"}],"singleton":true,"members":[{"name":"fail","tagname":"method","owner":"straw.core","id":"method-fail","meta":{}},{"name":"getRequestParams","tagname":"method","owner":"straw.core","id":"method-getRequestParams","meta":{}},{"name":"serviceCall","tagname":"method","owner":"straw.core","id":"method-serviceCall","meta":{}},{"name":"setConsole","tagname":"method","owner":"straw.core","id":"method-setConsole","meta":{"private":true}},{"name":"setLocation","tagname":"method","owner":"straw.core","id":"method-setLocation","meta":{"private":true}},{"name":"succeed","tagname":"method","owner":"straw.core","id":"method-succeed","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-straw.core","short_doc":"straw.core is the core API for Straw Service call functionality. ...","component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/straw-ios.html#straw-core' target='_blank'>straw-ios.js</a></div></pre><div class='doc-contents'><p><code><a href=\"#!/api/straw.core\" rel=\"straw.core\" class=\"docClass\">straw.core</a></code> is the core API for Straw Service call functionality.</p>\n\n<p>Straw Service developers should use <code>serviceCall</code> method of this class to create native Service Call request.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-fail' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='straw.core'>straw.core</span><br/><a href='source/straw-ios.html#straw-core-method-fail' target='_blank' class='view-source'>view source</a></div><a href='#!/api/straw.core-method-fail' class='name expandable'>fail</a>( <span class='pre'>callId, params, keepAlive</span> ) : void<span class=\"signature\"></span></div><div class='description'><div class='short'>Fail service call. ...</div><div class='long'><p>Fail service call.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>callId</span> : String<div class='sub-desc'><p>the Service call id</p>\n</div></li><li><span class='pre'>params</span> : Object<div class='sub-desc'><p>the parameter object which contains code and message fields</p>\n</div></li><li><span class='pre'>keepAlive</span> : Boolean<div class='sub-desc'><p>if true then keep the callback, otherwise drop it</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getRequestParams' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='straw.core'>straw.core</span><br/><a href='source/straw-ios.html#straw-core-method-getRequestParams' target='_blank' class='view-source'>view source</a></div><a href='#!/api/straw.core-method-getRequestParams' class='name expandable'>getRequestParams</a>( <span class='pre'>callId</span> ) : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>Get service call's request parameters. ...</div><div class='long'><p>Get service call's request parameters.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>callId</span> : String<div class='sub-desc'><p>the call id</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>the request parameter</p>\n</div></li></ul></div></div></div><div id='method-serviceCall' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='straw.core'>straw.core</span><br/><a href='source/straw-ios.html#straw-core-method-serviceCall' target='_blank' class='view-source'>view source</a></div><a href='#!/api/straw.core-method-serviceCall' class='name expandable'>serviceCall</a>( <span class='pre'>service, method, params, successCallback, failureCallback</span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Call a Straw Service. ...</div><div class='long'><p>Call a Straw Service.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>service</span> : String<div class='sub-desc'><p>the service name</p>\n</div></li><li><span class='pre'>method</span> : String<div class='sub-desc'><p>the method name</p>\n</div></li><li><span class='pre'>params</span> : Object<div class='sub-desc'><p>the parameter</p>\n</div></li><li><span class='pre'>successCallback</span> : Function<div class='sub-desc'><p>the success callback</p>\n</div></li><li><span class='pre'>failureCallback</span> : Function<div class='sub-desc'><p>the failure callback</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>the id of the created Service call</p>\n</div></li></ul></div></div></div><div id='method-setConsole' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='straw.core'>straw.core</span><br/><a href='source/straw-ios.html#straw-core-method-setConsole' target='_blank' class='view-source'>view source</a></div><a href='#!/api/straw.core-method-setConsole' class='name expandable'>setConsole</a>( <span class='pre'>console</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Set console object for strawCore\n\nThis method is used only for test. ...</div><div class='long'><p>Set console object for strawCore</p>\n\n<p>This method is used only for test.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>console</span> : Object<div class='sub-desc'><p>console object</p>\n</div></li></ul></div></div></div><div id='method-setLocation' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='straw.core'>straw.core</span><br/><a href='source/straw-ios.html#straw-core-method-setLocation' target='_blank' class='view-source'>view source</a></div><a href='#!/api/straw.core-method-setLocation' class='name expandable'>setLocation</a>( <span class='pre'>location</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Set location object for strawCore\n\nThis method is used only for test. ...</div><div class='long'><p>Set location object for strawCore</p>\n\n<p>This method is used only for test.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>location</span> : Object<div class='sub-desc'><p>location object</p>\n</div></li></ul></div></div></div><div id='method-succeed' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='straw.core'>straw.core</span><br/><a href='source/straw-ios.html#straw-core-method-succeed' target='_blank' class='view-source'>view source</a></div><a href='#!/api/straw.core-method-succeed' class='name expandable'>succeed</a>( <span class='pre'>callId, params, keepAlive</span> ) : void<span class=\"signature\"></span></div><div class='description'><div class='short'>Succeed service call. ...</div><div class='long'><p>Succeed service call.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>callId</span> : String<div class='sub-desc'><p>the Service call id</p>\n</div></li><li><span class='pre'>params</span> : Object<div class='sub-desc'><p>the parameter object which contains code and message fields</p>\n</div></li><li><span class='pre'>keepAlive</span> : Boolean<div class='sub-desc'><p>if true then keep the callback, otherwise drop it</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});