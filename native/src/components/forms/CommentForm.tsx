import React from "react";
import I18n from "react-native-i18n";
import { KeyboardAvoidingView, TouchableOpacity, StyleSheet } from "react-native";
import { View, Input, Icon } from "native-base";
import { useMutation } from "@apollo/react-hooks";

import AddComment, { MutationVariables } from "../../graphql/mutations/AddComment";

interface IProps {
  channelId: string;
}

const CommentForm = ({ channelId }: IProps) => {
  const [addComment, { loading }] = useMutation<{}, MutationVariables>(AddComment);
  const [comment, updateComment] = React.useState<string>("");

  const sendComment = () => {
    if (comment) {
      addComment({ variables: { comment: comment, channelId: channelId } });
      updateComment("");
    }
  };

  return (
    <KeyboardAvoidingView
      contentContainerStyle={styles.contentContainerStyle}
      behavior="padding"
      //   keyboardVerticalOffset={70}
    >
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.textField}>
            <Input placeholder={I18n.t("channels.comment")} onChangeText={updateComment} value={comment} />
          </View>
          <View style={styles.action}>
            <TouchableOpacity onPress={comment && !loading ? sendComment : undefined}>
              <Icon name="send" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    backgroundColor: "#fafafaff",
    marginBottom: -70
  },
  container: {
    borderTopWidth: 0.5,
    borderColor: "#b3b3b3"
  },
  addon: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fafafaff"
  },
  inputContainer: {
    backgroundColor: "#fafafaff",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textField: {
    paddingLeft: 10,
    flex: 0.93
  },
  action: {
    flex: 0.07,
    marginTop: 5
  }
});

export default CommentForm;
