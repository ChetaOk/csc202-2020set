import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ButtonGroup, Text, Button, Icon, CheckBox } from '@rneui/base';
import { showAlert, showDeleteConfirmation } from '../../../../global/tools/show-alert';
import { ITransactionEntry } from '../../types/definitions';
import { TransactionEntryContext } from '../../contexts/Contexts';
import { useNavigation } from '@react-navigation/native';
// import CheckBox from '@react-native-community/checkBox';


type Props = {
    item: ITransactionEntry;
}

const EntrySectionListItem: React.FC<Props> = ({ item }) => {

    const transactionEntryContext = useContext(TransactionEntryContext);
    
    const navigation = useNavigation();
    
    const { deleteEntry } = transactionEntryContext!
    
    return (
        <View style={styles.inputContainerStyle}>
            <CheckBox
                containerStyle={[styles.inputContainerStyle, { marginTop: 10 }, { width: 40}, ]}
                onPress={() => {
                    //deleteEntry(item.id!)
                    showDeleteConfirmation(
                        "Done!!!",
                        "This entry would be checked as done and cleared!",
                        item.id!,
                        deleteEntry
                    );
                } } checked={false}            
            />
            {/* <Text style={{ fontSize: 18 }}>Income?: {item.expense ? "No" : "Yes"}</Text> */}
            <Text style={{ fontSize: 18 }}>Description: {item.description}</Text>
            {/* <Text style={{ fontSize: 18 }}>Amount: {item.amount}</Text> */}
            <ButtonGroup
                containerStyle={{ backgroundColor: '#194d33', width: '40%', borderColor: '#194d33' }}
                buttons={
                    [<Button
                        icon={<Icon
                            name="edit"
                            color="green"
                        />}
                        type="clear"
                        title="Edit"
                        titleStyle={{ fontSize: 15 }}
                        onPress={() => navigation.navigate("EditEntryScreen" as never,{transactionEntryToEdit: item} as never)}
                    />,
                    <Button
                        icon={<Icon
                            name="delete"
                            color="red"
                        />}
                        type="clear"
                        title="Delete"
                        titleStyle={{ fontSize: 15 }}
                        onPress={() => {
                            //deleteEntry(item.id!)
                            showDeleteConfirmation(
                                "About to Delete",
                                "Are you sure that you want to delete this entry?",
                                item.id!,
                                deleteEntry
                            )
                        }}
                    />
                    ]
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainerStyle: {
        width: '100%',
        padding: 9
    }
});

export default EntrySectionListItem;