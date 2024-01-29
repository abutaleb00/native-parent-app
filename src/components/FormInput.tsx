import React, {useState} from 'react';
import {Platform, Pressable, Text, TextInput, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FormInput = (props: any) => {
  const {
    placeholder,
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    onSubmitEditing,
    refName,
    secureTextEntry,
    disabled = false,
    classname,
    ...inputProps
  } = props;
  const hasError = errors[name] && touched[name];
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextInput
          ref={refName}
          placeholder={placeholder}
          onChangeText={text => onChange(name)(text)}
          onBlur={() => {
            setFieldTouched(name);
            onBlur(name);
          }}
          autoCapitalize="none"
          autoCorrect={false}
          value={value}
          {...inputProps}
          className={classname}
          style={{
            borderColor: '#001D6C',
            borderWidth: 0.5,
            color: '#001D6C',
            width: '100%',
            fontSize: 15,
            borderRadius: 10,
            paddingLeft: 20,
            padding: Platform.OS === 'ios' ? 15 : 10,
            opacity: disabled ? 0.5 : 1,
            backgroundColor: disabled ? 'lightgrey' : 'transparent',
          }}
          placeholderTextColor="#A7A9AC"
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={secureTextEntry && !showPassword ? true : false}
          editable={disabled ? false : true}
          selectTextOnFocus={disabled ? false : true}
        />
        {secureTextEntry && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={{marginLeft: '-10%'}}>
            <MaterialCommunityIcons
              name={showPassword ? 'eye' : 'eye-off'}
              size={22}
              color="#232323"
            />
          </Pressable>
        )}
      </View>
      {errors[name] && touched[name] && (
        <Text
          maxFontSizeMultiplier={1.2}
          style={{color: 'red', marginTop: 4, marginLeft: 4, fontSize: 12}}>
          {errors[name]}
        </Text>
      )}
    </>
  );
};
export default FormInput;
