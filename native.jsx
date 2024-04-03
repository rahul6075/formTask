import React, { useRef } from "react";
import { View } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";

function App() {
  const webViewRef = useRef < WebView > null;

  const jsonFormData = {
    name: "Gulshan Gupta",
    email: "gulshan.gupta@example.com",
    experience: "5",
  };

  const _onMessage = (event: WebViewMessageEvent) => {
    try {
      const res = JSON.parse(event.nativeEvent.data);
      console.log("_onMessage", res);
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  };

  const handleWebViewError = (error: any) => {
    console.log("WebView Error:", error);
  };

  const injectScript = `
  (function() {
    const formData = ${JSON.stringify(jsonFormData)};
    Object.keys(formData).forEach(key => {
      const input = document.getElementById(key);
      if (input) {
        input.focus();
        input.value = formData[key];
      }
    });
    
    const submitButton = document.getElementById('submitButton');
    if (submitButton) {
      submitButton.addEventListener("click", function() {  
        window.ReactNativeWebView.postMessage(JSON.stringify({type: "click", message : "ok",}));
      });
    }
    window.onerror = function(message, source, lineno, colno, error) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'error',
        message: message,
        source: source,
        lineno: lineno,
        colno: colno,
        error: error,
      }));
    };
  })();
`;

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        source={{ uri: "http://192.168.1.2:5173/" }}
        javaScriptEnabledAndroid={true}
        injectedJavaScript={injectScript}
        onMessage={_onMessage}
        domStorageEnabled={true}
        onError={handleWebViewError}
      />
    </View>
  );
}

export default App;
