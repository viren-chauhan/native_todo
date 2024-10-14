import { useMemo } from "react"
import { StyleSheet } from "react-native"

export const useFormInputControllerStyle = ({ isFocus }: any) => {
    const styles = useMemo(() => {
        return StyleSheet.create({
            input: {
                ...( isFocus && {backgroundColor:  '#A2D2DF'}),
                width: '90%',
                borderWidth: 1,
                paddingHorizontal: 20,
                borderRadius: 6,
                marginTop:20
            }
        });
    }, [isFocus]);
    return { styles }
}
