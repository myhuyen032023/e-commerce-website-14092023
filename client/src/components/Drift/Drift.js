import React, { Fragment } from "react";
import PropTypes from "prop-types";

class Drift extends React.Component {
  constructor(props) {
    super(props);

    this.addMainScript = this.addMainScript.bind(this);
    this.addIdentityVariables = this.addIdentityVariables.bind(this);
    this.insertScript = this.insertScript.bind(this);
  }

  insertScript(scriptText) {
    const script = document.createElement("script");
    script.innerText = scriptText;
    script.async = true;
    //document.body.style.display = "none";

    document.body.appendChild(script);
  }

  addMainScript() {
    const scriptText = `
<script>
"use strict";

!function() {
  var t = window.driftt = window.drift = window.driftt || [];
  if (!t.init) {
    if (t.invoked) return void (window.console && console.error && console.error("Drift snippet included twice."));
    t.invoked = !0, t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ], 
    t.factory = function(e) {
      return function() {
        var n = Array.prototype.slice.call(arguments);
        return n.unshift(e), t.push(n), t;
      };
    }, t.methods.forEach(function(e) {
      t[e] = t.factory(e);
    }), t.load = function(t) {
      var e = 3e5, n = Math.ceil(new Date() / e) * e, o = document.createElement("script");
      o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + n + "/" + t + ".js";
      var i = document.getElementsByTagName("script")[0];
      i.parentNode.insertBefore(o, i);
    };
  }
}();
drift.SNIPPET_VERSION = '0.3.1';
drift.load('7hchd9e3fek7');
</script>`;

    this.insertScript(scriptText);
  }

  addIdentityVariables() {
    if (typeof this.props.userId !== "undefined") {
      let scriptText = `
        var t = window.driftt = window.drift = window.driftt || [];
        drift.identify('${this.props.userId}', ${JSON.stringify(
        this.props.attributes
      )})
      `;
      this.insertScript(scriptText);
    }
  }
  componentWillMount() {
    if (typeof window !== "undefined" && !window.drift) {
      this.addMainScript();
      this.addIdentityVariables();
    }
  }
  componentDidMount() {
    window.drift.on("message", function(data) {
      console.log(
        "User received a message from" +
          data.teamMember.name +
          " in conversation " +
          data.conversationId
      );
    });
    window.drift.on("startConversation", function(data) {
      console.log("User started a new conversation " + JSON.stringify(data));
    });

    window.drift.on("ready", function(api, payload) {
      // your code goes here
      api.openChat();
      var iframe = document.getElementById("drift-widget");
      //var nwElmnt = iframe.contentDocument || iframe.contentWindow.document;

      //var elmnt = document.getElementsByTagName("textarea")[0];
      // var nwElmnt = iframe.contentWindow.document.getElementsByTagName(
      //   "textarea"
      // )[0];
      //document.querySelector("#drift-widget");
      console.log("iframe", iframe);
      //console.log("textArea", nwElmnt);
      console.log("Api", api);
      console.log("payload", payload);
      // api.startInteration()
    });
  }
  checkHere() {
    try {
      const iframeW = document.getElementById("drift-widget");
      const newIframe =
        iframeW.contentDocument || iframeW.contentWindow.document;
      console.log("DriftWIdget", newIframe);
    } catch (ex) {
      console.log("what error is this?", JSON.stringify(ex));
    }
  }
  render() {
    return (
      <Drift/>
    );
  }
}

const propTypes = {
  appId: PropTypes.string.isRequired,
  attributes: PropTypes.object
};

Drift.propTypes = propTypes;

export default Drift