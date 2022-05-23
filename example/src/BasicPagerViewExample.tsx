import React, { useMemo } from 'react';
import { StyleSheet, View, SafeAreaView, Animated, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import PagerView from 'react-native-pager-view';

import { LikeCount } from './component/LikeCount';
import { NavigationPanel } from './component/NavigationPanel';
import { useNavigationPanel } from './hook/useNavigationPanel';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);
const Tab = createMaterialBottomTabNavigator();

function Component() {
  const { ref, ...navigationPanel } = useNavigationPanel();

  return (
    <SafeAreaView style={styles.container}>
      <AnimatedPagerView
        //@ts-ignore
        testID="pager-view"
        ref={ref}
        style={styles.PagerView}
        initialPage={0}
        layoutDirection="ltr"
        overdrag={navigationPanel.overdragEnabled}
        scrollEnabled={navigationPanel.scrollEnabled}
        onPageScroll={navigationPanel.onPageScroll}
        onPageSelected={navigationPanel.onPageSelected}
        onPageScrollStateChanged={navigationPanel.onPageScrollStateChanged}
        pageMargin={10}
        // Lib does not support dynamically orientation change
        orientation="horizontal"
        // Lib does not support dynamically transitionStyle change
        transitionStyle="scroll"
        showPageIndicator={navigationPanel.dotsEnabled}
      >
        {useMemo(
          () =>
            navigationPanel.pages.map((page, index) => (
              <View key={page.key} style={page.style} collapsable={false}>
                <TextInput
                  style={{
                    height: 100,
                    width: '100%',
                    backgroundColor: 'red',
                  }}
                />

                <LikeCount />
                <Text
                  testID={`pageNumber${index}`}
                >{`page number ${index}`}</Text>
              </View>
            )),
          [navigationPanel.pages]
        )}
      </AnimatedPagerView>
      <NavigationPanel {...navigationPanel} />
    </SafeAreaView>
  );
}

export function BasicPagerViewExample() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="test" component={Component} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: 300,
    height: 200,
    padding: 20,
  },
  PagerView: {
    flex: 1,
  },
});
