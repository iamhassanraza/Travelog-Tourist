package com.campusgruv_ui;
import android.content.Intent;
import android.os.Bundle;
import android.net.Uri;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "CampusGruv_UI";
  }

   @Override
 protected ReactActivityDelegate createReactActivityDelegate() {
   return new ReactActivityDelegate(this, getMainComponentName()) {
    @Override 
    protected Bundle getLaunchOptions() { 
    Intent intent = MainActivity.this.getIntent(); 
    Bundle bundle = new Bundle(); 
    Uri data= intent.getData(); if (data!= null) { bundle.putString("data", data.toString()); }else{ bundle.putString("data", ""); } return bundle; }
     @Override
     protected ReactRootView createRootView() {
      return new RNGestureHandlerEnabledRootView(MainActivity.this);
     }
   };
 }

}
