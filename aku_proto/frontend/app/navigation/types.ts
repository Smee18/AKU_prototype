import { StackNavigationProp } from '@react-navigation/stack';

export type AuthStackParamList = {
  MotherInfoScreenA: undefined;
  MotherInfoScreenB: undefined;
  ClinicInfoScreen: undefined;
  BeginScreen: undefined;
  WHOScreen: undefined;
  Q1Screen: undefined
  Q2Screen: undefined;
  Q3Screen: undefined;
  Q4Screen: undefined;
  Q5Screen: undefined;
  Q6Screen: undefined;
  Q7Screen: undefined;
  Q8Screen: undefined;
  Q9Screen: undefined;
  OutcomeScreen: { result: any };

};

export type MotherInfoScreenANavigationProp = StackNavigationProp<AuthStackParamList, "MotherInfoScreenA">;
export type MotherInfoScreenBNavigationProp = StackNavigationProp<AuthStackParamList, "MotherInfoScreenB">;
export type ClinicInfoScreenNavigationProp = StackNavigationProp<AuthStackParamList, "ClinicInfoScreen">;
export type BeginScreenNavigationProp = StackNavigationProp<AuthStackParamList, "BeginScreen">;
export type WHOScreenNavigationProp = StackNavigationProp<AuthStackParamList, "WHOScreen">;
export type Q1ScreenNavigationProp = StackNavigationProp<AuthStackParamList, "Q1Screen">;
export type Q2ScreenNavigationProp = StackNavigationProp<AuthStackParamList, "Q2Screen">;
export type Q3ScreenNavigationProp = StackNavigationProp<AuthStackParamList, "Q3Screen">;
export type Q4ScreenNavigationProp = StackNavigationProp<AuthStackParamList, "Q4Screen">;
export type Q5ScreenNavigationProp = StackNavigationProp<AuthStackParamList, "Q5Screen">;
export type Q6ScreenNavigationProp = StackNavigationProp<AuthStackParamList, "Q6Screen">;
export type Q7ScreenNavigationProp = StackNavigationProp<AuthStackParamList, "Q7Screen">;
export type Q8ScreenNavigationProp = StackNavigationProp<AuthStackParamList, "Q8Screen">;
export type Q9ScreenNavigationProp = StackNavigationProp<AuthStackParamList, "Q9Screen">;
export type OutcomeScreenNavigationProp = StackNavigationProp<AuthStackParamList, "OutcomeScreen">;



const authTypes = {};
export default authTypes;