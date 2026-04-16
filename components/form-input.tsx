import { Controller, useForm } from "react-hook-form";
import { Button, TextInput, View } from "react-native";
import { ThemedText } from "./themed-text";

export function FormInput() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <View>
      <Controller
        control={control}
        name="Username"
        rules={{ required: "true" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={{ borderWidth: 1, marginBottom: 10, color: "white" }}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.Username && <ThemedText>This field is required</ThemedText>}
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

export default FormInput;
