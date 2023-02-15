import React, {PropsWithChildren} from 'react';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {NavigationContainer, ParamListBase, RouteProp} from '@react-navigation/native';
import {DrawerNavigationOptions} from '@react-navigation/drawer';
import {NativeStackNavigatorProps} from '@react-navigation/native-stack/lib/typescript/src/types';

export type Keys<T> = keyof T;
export type ContentKeys<T extends {content: any}> = Keys<T['content']>;

export type RootSetAs = keyof Pick<Layout, 'stacks' | 'tabs' | 'drawers'>;

// Options
export type BaseOptions<Return = NativeStackNavigationOptions> =
  | Return
  | ((props?: {route?: RouteProp<ParamListBase, string>; navigation?: any}) => Return);
type ScreenOptions = BaseOptions<NativeStackNavigationOptions>;
export type StackScreenOptions = ScreenOptions;
export type ModalScreenOptions = ScreenOptions;
export type TabScreenOptions = BaseOptions<BottomTabNavigationOptions>;
export type DrawerScreenOptions = BaseOptions<DrawerNavigationOptions>;
export type ContainerOptions = BaseOptions<NativeStackNavigationOptions>;

// Definitions
export type TStackDefinition<ScreensName, StacksName> =
  | StacksName
  | ScreensName[]
  | TStackDataObj<ScreensName>;
export type TDrawerDefinition<DrawerName> = DrawerName; // maybe smth else will be added
export type TTabsDefinition<TabsName> = TabsName; // maybe smth else will be added

// Data
export type TScreenData<Props = {}> =
  | NavioScreen<Props>
  | {
      component: NavioScreen<Props>;
      options?: ScreenOptions;
    };
export type TStackDataObj<ScreensName> = {
  screens: ScreensName[];
  containerOptions?: ContainerOptions;
  navigatorProps?: Omit<NativeStackNavigatorProps, 'children'>; // omitting required children prop
};
export type TStackData<ScreensName> = ScreensName[] | TStackDataObj<ScreensName>;
export type TTabContentData<ScreensName, StacksName> = {
  stack: TStackDefinition<ScreensName, StacksName>;
  options?: TabScreenOptions;
};
export type TTabsContentValue<ScreensName, StacksName> =
  | TStackDefinition<ScreensName, StacksName>
  | TTabContentData<ScreensName, StacksName>;
export type TTabsData<ScreensName, StacksName> = {
  content: Record<string, TTabsContentValue<ScreensName, StacksName>>;
  containerOptions?: ContainerOptions;
  navigatorProps?: any; // TODO BottomTabNavigatorProps doesn't exist :(
};
// export type TTabUpdatedOptions = {name: string; options: BaseOptions<BottomTabNavigationOptions>};
export type TModalData<ScreensName, StacksName> = TStackDefinition<ScreensName, StacksName>;
export type TDrawerContentData<ScreensName, StacksName> = {
  stack: TStackDefinition<ScreensName, StacksName>;
  options?: DrawerScreenOptions;
};
export type TDrawerContentValue<ScreensName, StacksName> =
  | TStackDefinition<ScreensName, StacksName>
  | TDrawerContentData<ScreensName, StacksName>;
export type TDrawersData<ScreensName, StacksName> = {
  content: Record<string, TDrawerContentValue<ScreensName, StacksName>>;
  containerOptions?: ContainerOptions;
  navigatorProps?: any; // TODO DrawerNavigatorProps doesn't exist :(
};
export type TRootName<StacksName, TabsName, DrawersName> = TabsName | StacksName | DrawersName;
export type ExtractProps<Type> = Type extends React.FC<infer X> ? X : never;

// Layout
export type Layout<
  Screens = any,
  Stacks = any,
  Tabs = any,
  Modals = any,
  Drawers = any,
  RootName = any,
> = {
  /**
   * `(required)`
   * Screens of the app. Navigate to by using `navio.push('...')` method.
   */
  screens: Screens;

  /**
   * `(optional)`
   * Stacks of the app. Navigate to by using `navio.pushStack('...Stack')` method. Good to use if you want to hide tabs on the specific screens.
   */
  stacks?: Stacks;

  /**
   * `(optional)`
   * Tabs app. Navigate to by using `navio.jumpTo('...Tab')` method.
   */
  tabs?: Tabs;

  /**
   * `(optional)`
   * Modals of the app. Navigate to by using `navio.show('...Modal')` method.
   */
  modals?: Modals;

  /**
   * `(optional)`
   * Drawers of the app. Navigate to by using `navio.drawer.open('...Drawer')` method.
   */
  drawers?: Drawers;

  /**
   * `(optional)`
   * Root name to start the app with. Possible values `any of tabs, stacks, drawers names`.
   */
  root?: RootName;

  /**
   * `(optional)`
   * List of hooks that will be run on each generated stack or tab navigators. Useful for dark mode or language change.
   */
  hooks?: Function[];

  /**
   * `(optional)`
   * Default options to be applied per each stack's, tab's or drawer's screens generated within the app.
   */
  defaultOptions?: DefaultOptions;
};
export type DefaultOptions = {
  stacks?: {
    screen?: StackScreenOptions;
    container?: ContainerOptions;
  };
  tabs?: {
    screen?: TabScreenOptions;
    container?: ContainerOptions;
  };
  drawers?: {
    screen?: DrawerScreenOptions;
    container?: ContainerOptions;
  };
  modals?: {
    container?: ContainerOptions;
  };
};
export type NavioScreen<Props = {}> = React.FC<PropsWithChildren<Props>> & {
  options?: StackScreenOptions;
};

// Layouts
export type RootProps<RootName extends string> = {
  navigationContainerProps?: Omit<ExtractProps<typeof NavigationContainer>, 'children'>;
  initialRouteName?: RootName;
};
