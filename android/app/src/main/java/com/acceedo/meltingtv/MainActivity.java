package com.acceedo.meltingtv;

import android.os.Bundle;
import android.view.View;
import android.webkit.WebSettings;  // REQUIRED
import android.webkit.WebView;      // REQUIRED
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Fullscreen for TV
    getWindow().getDecorView().setSystemUiVisibility(
      View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
        | View.SYSTEM_UI_FLAG_FULLSCREEN
        | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
    );
  }

  @Override
  public void onResume() {
    super.onResume();

    // The "if" check below prevents the app from crashing
    if (this.bridge != null) {
      WebView webView = this.bridge.getWebView();
      if (webView != null) {
        WebSettings settings = webView.getSettings();

        // Fixes the 65-inch TV scaling issue
        settings.setUseWideViewPort(true);
        settings.setLoadWithOverviewMode(true);
        webView.setInitialScale(0);
      }
    }
  }

  @Override
  public void onBackPressed() {
    // Disable back button
  }
}

