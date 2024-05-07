import "./App.css";
import {
  ChakraProvider,
  Box,
  Button,
  Heading,
  Flex,
  Text,
  Input,
  ListItem,
  OrderedList,
} from "@chakra-ui/react";
import { DeleteIcon, AddIcon, EditIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import StarRating from "./components/StarRating";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import db from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

type ToReads = {
  id: number;
  title: string;
};

export default function App() {
  const [toreads, setToreads] = useState<ToReads[]>([]);
  //input欄の新しい項目(タイトル)を追加
  const [toreadTitle, setToreadTitle] = useState<string>("");
  //新しいIDを付与
  const [toreadId, setToreadId] = useState<number>(toreads.length + 1);
  //inputタグの入力
  const handleAddFormChanges = (e: any) => {
    setToreadTitle(e.target.value); //inputに入れたタイトルを格納
    console.log(toreadTitle);
    if (e.target.value) {
      setAddError("");
    }
  };
  //エラー(リストに追加・バリデーション)
  const [AddError, setAddError] = useState<string>("");
  //エラー(編集・バリデーション)
  const [EditError, setEditError] = useState<string>("");

  //新規追加
  const addToRead = async () => {
    // バリデーション
    if (!toreadTitle) {
      setAddError("入力必須です");
      console.log("空です");
      return;
    }

    const newToread: ToReads = {
      id: toreadId,
      title: toreadTitle,
    };

    try {
      // Firestore にデータを追加する
      const docRef = await addDoc(collection(db, "inputs"), newToread);
      console.log("Document written with ID: ", docRef.id);

      // Firestore にデータが追加されたら、toreads ステートを更新する
      setToreads([...toreads, newToread]);
      setToreadId(toreadId + 1);
      setToreadTitle(""); // 入力欄のタイトルを初期化
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  // const addToRead = () => {
  //   //バリデーション
  //   if (!toreadTitle) {
  //     setAddError("入力必須です");
  //     console.log("空です");
  //     return;
  //   }
  //   const newToread: ToReads = {
  //     id: toreadId,
  //     title: toreadTitle,
  //   };
  //   setToreads([...toreads, newToread]);
  //   setToreadId(toreadId + 1);
  //   setToreadTitle(""); //入力欄のタイトルを初期化

  //   console.log(toreadTitle);
  //   console.log(toreadId);
  // };

  // リストから削除
  const deleteReads = (targetToread: any) => {
    setToreads(toreads.filter((toread) => toread !== targetToread));
    setIsEditable(false);
  };

  //編集画面切り替え
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const handleOpenEditForm = (read: any) => {
    setIsEditable(true); //編集ボタンを押すと編集画面が開く
    setEditId(read.id); //編集対象のIDをセット
    setNewTitle(read.title); //編集対象のtitleiをnputに表示
  };
  const handleCloseEditForm = () => {
    setIsEditable(false); //キャンセルボタンを押すと編集画面が閉じる
    setEditId(0); //IDを初期化
  };

  //編集したいtoreadeのIDの状態を定義
  const [editId, setEditId] = useState<number>(0);
  //新しいタイトルを定義
  const [newTitle, setNewTitle] = useState<string>("");

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
    console.log(newTitle);
    if (e.target.value) {
      setEditError("");
    }
  };

  const handleEditToRead = () => {
    // バリデーション
    if (!newTitle) {
      setEditError("入力必須です");
      console.log("空です");
      return;
    }
    // 編集内容をToReadリストに加える
    const newArray = toreads.map((toread) =>
      toread.id === editId ? { ...toread, title: newTitle } : toread
    );
    setToreads(newArray);
    setNewTitle("");
    handleCloseEditForm();
  };

  // 完了リスト
  const [dones, setDones] = useState<ToReads[]>([]);
  // 完了リストに追加
  const addReadDone = (targetReadDone: any) => {
    //現在の日時を取得
    const doneDate = new Date();

    // 完了リストに追加するオブジェクト
    const newReadDone = {
      ...targetReadDone,
      doneDate: doneDate.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    //完了リストに追加
    setDones([...dones, newReadDone]);
    //読書予定リストから削除
    deleteReads(targetReadDone);
  };
  //完了リストから削除
  const deleteDone = (targetReadDone: any) => {
    setDones(dones.filter((done) => done !== targetReadDone));
  };

  //読書予定リストに戻す
  const backToRead = (targetReadDone: any) => {
    const newToread: ToReads = {
      id: toreadId,
      title: targetReadDone.title,
    };
    setToreads([...toreads, newToread]);
    deleteDone(targetReadDone);
  };

  useEffect(() => {
    const postData = collection(db, "inputs");
    getDocs(postData).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: data.id,
          title: data.title,
        };
      });

      const mergedToreads = [
        ...toreads,
        ...newData.filter(
          (item) => !toreads.some((existing) => existing.id === item.id)
        ),
      ];
      setToreads(mergedToreads);
    });
  }, []);

  return (
    <>
      <ChakraProvider>
        <Header />
        <Box
          backgroundImage="url('./books02.jpg')"
          backgroundSize="cover"
          backgroundPosition="top"
          backgroundRepeat="no-repeat"
          minHeight="100vh"
          height="100%"
          pt={100}
        >
          <Flex>
            <Box width="75%">
              <Box
                id="toread"
                mr={20}
                ml={20}
                mb={20}
                p={20}
                pr={10}
                pl={10}
                // backgroundImage="radial-gradient(rgba(14, 244, 255, 0.21) 80%, rgba(26, 183, 221, 0.21) 97%)"
                bg="aliceblue"
                borderRadius={20}
              >
                <Heading
                  as="h2"
                  textAlign="center"
                  mt={-5}
                  fontSize={35}
                  letterSpacing="0.15em"
                >
                  読みたい本
                </Heading>
                <Flex alignItems="center" mt="20">
                  <Input
                    fontSize={25}
                    w={500}
                    mr={20}
                    p={7}
                    type="text"
                    border={"1px solid #333"}
                    value={toreadTitle}
                    onChange={handleAddFormChanges}
                    placeholder="読みたい本を入力してください"
                  />
                  <Button
                    p={7}
                    onClick={addToRead}
                    borderRadius={10}
                    _hover={{ bg: "teal.200" }}
                    fontSize={16}
                    border="1px solid #ddd"
                  >
                    読む予定に追加
                    <AddIcon ml={5} />
                  </Button>
                </Flex>
                {AddError && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "25px",
                      fontWeight: "bold",
                      letterSpacing: "0.1em",
                      marginTop: "10px",
                      marginLeft: "20px",
                    }}
                  >
                    {AddError}
                  </p>
                )}
              </Box>

              {/* 読む予定リスト */}
              <Box
                id="plantoread"
                mr={20}
                ml={20}
                mt={0}
                mb={20}
                p={20}
                pr={10}
                pl={10}
                // bgImage="radial-gradient(rgba(159, 245, 144, 0.24) 86%, rgba(4, 202, 255, 0.24))"
                bg="cornsilk"
                borderRadius={20}
              >
                <Heading
                  as="h2"
                  textAlign="center"
                  mt={-5}
                  fontSize={35}
                  mb={20}
                  letterSpacing="0.15em"
                >
                  読む予定の本
                </Heading>
                {/* リスト部分 */}
                <OrderedList fontSize={25} mr={10} fontWeight={"bold"}>
                  {toreads.map((read: any) => (
                    <ListItem
                      color="blackAlpha.700"
                      fontSize={26}
                      mb={20}
                      letterSpacing={"0.1em"}
                      key={read.id}
                    >
                      <Box flex="1" mb={10}>
                        {read.title}
                      </Box>

                      {/* 編集画面 */}

                      <Flex width="100%" alignItems="center">
                        <Button
                          fontSize={16}
                          p={7}
                          mr={10}
                          marginLeft="auto"
                          onClick={() => addReadDone(read)}
                          _hover={{ bg: "teal.200" }}
                          border="1px solid #ddd"
                        >
                          読んだ本に追加
                          <AddIcon ml={5} />
                        </Button>

                        <Button
                          fontSize={16}
                          p={7}
                          mr={10}
                          _hover={{ bg: "teal.200" }}
                          // 編集対象のreadを渡す
                          onClick={() => handleOpenEditForm(read)}
                          border="1px solid #ddd"
                        >
                          編集する
                          <EditIcon ml={5} />
                        </Button>

                        <Button
                          fontSize={16}
                          p={7}
                          onClick={() => deleteReads(read)}
                          _hover={{ bg: "red.200" }}
                          border="1px solid #ddd"
                        >
                          読む予定から削除
                          <DeleteIcon ml={5} />
                        </Button>
                      </Flex>
                    </ListItem>
                  ))}
                </OrderedList>
                {/* 編集画面 */}

                {isEditable ? (
                  <>
                    <Flex alignItems="center" mt={40}>
                      {/* 編集input */}
                      <Input
                        type="text"
                        fontSize={25}
                        w={600}
                        mr={10}
                        p={6}
                        border={"1px solid #333"}
                        //新しいタイトルとinputを紐付け
                        value={newTitle}
                        //入力値に応じてstateを更新
                        onChange={handleEditFormChange}
                      />
                      <Button
                        fontSize={16}
                        p={7}
                        mr={5}
                        _hover={{ bg: "teal.200" }}
                        onClick={handleEditToRead}
                      >
                        編集を保存
                      </Button>
                      <Button
                        onClick={handleCloseEditForm}
                        fontSize={16}
                        p={7}
                        border="1px solid #ddd"
                        _hover={{ bg: "red.200" }}
                      >
                        キャンセル
                      </Button>
                    </Flex>
                    <Box>
                      {EditError && (
                        <p
                          style={{
                            color: "red",
                            fontSize: "25px",
                            fontWeight: "bold",
                            letterSpacing: "0.1em",
                            marginTop: "10px",
                            marginLeft: "20px",
                          }}
                        >
                          {EditError}
                        </p>
                      )}
                    </Box>
                  </>
                ) : null}
              </Box>

              <Box
                id="done"
                mr={20}
                ml={20}
                mt={0}
                mb={200}
                p={20}
                pr={10}
                pl={10}
                bgImage="radial-gradient(rgba(249, 192, 187, 0.32), rgba(253, 177, 170, 0.26) 62%, rgba(240, 226, 226, 0.32) 98%)"
                bg="red.50"
                borderRadius={20}
              >
                <Heading
                  as="h2"
                  textAlign="center"
                  mt={-5}
                  fontSize={35}
                  mb={20}
                  letterSpacing="0.15em"
                >
                  読んだ本
                </Heading>
                <OrderedList fontSize={25} mr={10} fontWeight={"bold"}>
                  {dones.map((done: any) => (
                    <ListItem
                      color="blackAlpha.700"
                      fontSize={25}
                      mb={20}
                      letterSpacing={"0.1em"}
                      key={done.id}
                    >
                      <Box flex="1" mb={7} gap={5}>
                        <Text mr={50} mb={5}>
                          {done.title}
                        </Text>
                        <Flex alignItems="flex-start" mb={5}>
                          <StarRating />
                          <Text marginLeft="auto" fontSize={20}>
                            読了日:{done.doneDate}
                          </Text>
                        </Flex>
                      </Box>
                      <Flex alignItems="center">
                        <Button
                          fontSize={16}
                          p={7}
                          marginLeft="auto"
                          _hover={{ bg: "teal.200" }}
                          border="1px solid #ddd"
                          onClick={() => backToRead(done)}
                        >
                          読む予定に戻す
                          <ArrowUpIcon ml={5} />
                        </Button>
                        <Button
                          fontSize={16}
                          p={7}
                          ml={10}
                          onClick={() => deleteDone(done)}
                          _hover={{ bg: "red.200" }}
                          border="1px solid #ddd"
                        >
                          読んだ本から削除
                          <DeleteIcon ml={5} />
                        </Button>
                      </Flex>
                    </ListItem>
                  ))}
                </OrderedList>
              </Box>
            </Box>
            {/* //サイドバー */}
            <Sidebar donesLength={dones.length} />
          </Flex>
        </Box>
        <Footer />
      </ChakraProvider>
    </>
  );
}
