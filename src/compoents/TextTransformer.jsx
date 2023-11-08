import React, { useEffect, useState } from "react";
import copy from "copy-to-clipboard";
import { Box, Button, Input, NumberInput, NumberInputField, useToast } from "@chakra-ui/react";
import ShowBox from "./ShowBox";

const TextTransformer = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [price, setPrice] = useState("");
  const [usd, setUsd] = useState("");
  const [eur, setEur] = useState("");
  const [cny, setCny] = useState("");
  const [copy_usd, setCopyUSD] = useState("");
  const [copy_eur, setCopyEUR] = useState("");
  const [copy_cny, setCopyCny] = useState("");
  const toast = useToast();

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const transformText = () => {
    setOutputText(inputText.toUpperCase());
    setInputText("");
  };

  const copyToClipboard = () => {
    copy(outputText);
    toast({
      title: "Text copyed Successfully",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

  const copyUsd = () => {
    copy(copy_usd);
    toast({
      title: "USD Copied Successfully",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  }

  const copyCny = () => {
    copy(copy_cny);
    toast({
      title: "CNY Copied Successfully",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  }

  const copyEur = () => {
    copy(copy_eur);
    toast({
      title: "EUR Copied Successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  }

  const handleprice = async () => {
    let usd_Price = price * usd;
    let inc_usd = usd_Price * 60 / 100;
    let totalUSD = usd_Price + inc_usd;
    let fix_USD = totalUSD.toFixed(2);
    setCopyUSD(fix_USD);

    let eur_pricing = price * eur;
    let inc_eur = eur_pricing * 60 / 100;
    let totalEUR = eur_pricing + inc_eur;
    let fix_EUR = totalEUR.toFixed(2);
    setCopyEUR(fix_EUR);


    let cny_pricing = price * cny;
    console.log(cny_pricing);
    let inc_cny = cny_pricing * 60 / 100;
    let totalCNY = cny_pricing + inc_cny;
    let fix_CNY = totalCNY.toFixed(2);
    setCopyCny(fix_CNY);

  }

  const fetchDataTodo = async () => {

    let storedUSD = sessionStorage.getItem("USDprice") || undefined;
    let storedEUR = sessionStorage.getItem("EURprice") || undefined;
    let storedCNY = sessionStorage.getItem("CNYprice") || undefined;


    setUsd(storedUSD);
    setEur(storedEUR);
    setCny(storedCNY); 

    if (storedUSD == undefined || storedEUR == undefined || storedCNY == undefined) {
      console.log("reached");
      let val = await fetch(`https://open.er-api.com/v6/latest/INR`);
      let data = await val.json();
      setUsd(data.rates.USD);
      setEur(data.rates.EUR);
      setCny(data.rates.CNY);

      sessionStorage.setItem("USDprice", data.rates.USD);
      sessionStorage.setItem("EURprice", data.rates.EUR);
      sessionStorage.setItem("CNYprice", data.rates.CNY);
    }

  }

  useEffect(() => {
    if (usd.length == 0 || eur.length == 0) {
      fetchDataTodo();
    }

  }, []);

  return (
    <Box >
      <ShowBox usd={usd} eur={eur} cny={cny} />
      <Box className="mybox"
        display={{ base: "grid", lg: "flex" }}
        alignItems={"center"}
        backgroundSize={"cover"}
        justifyContent={"left"}
        backgroundRepeat={"no-repeat"}
        width={"100%"}
      >
        <Box className="white_box" >
          <h2>Text Transformer web </h2>
          <Box display={"flex"} alignItems={"center"} gap={"4px"} justifyContent={"center"} >
            <Input
              type="text"
              placeholder="Enter text"
              value={inputText}
              // w={{ base: "60%", lg: "400px" }}  
              border={"1px solid white"}
              onChange={handleInputChange}
            />
            <Box position={"relative"} display={"flex"} alignItems={"center"} justifyContent={"center"} h={"50px"}>
              <Button
                bg={"unset"}
                color={"yellow"}
                colorScheme="blue"
                border={"1px solid white"}
                _hover={{ backgroundColor: "black" }}
                onClick={transformText}>
                Transform
              </Button>
            </Box>
          </Box>
          <div>
            <h3>Output:</h3>
            <textarea
              className="outputbox"
              onClick={copyToClipboard}
              value={outputText}
              readOnly
            />
          </div>
        </Box>

        {/* ======================== pricing box ======================== */}
        <Box display={"grid"} backgroundColor={"green"} padding={"20px"} borderRadius={10} color={"yellow"}>
          <Box display={"grid"} gap={2}>
            <NumberInput value={price} >
              <NumberInputField placeholder="Indian Price" onChange={(e) => setPrice(e.target.value)} />
            </NumberInput>

            <Button onClick={handleprice} w={"100%"} > Convert </Button>
          </Box>
          <Box display={"grid"} gap={2}>
            <h3>USD: with 60% </h3>
            <Input
              onClick={copyUsd}
              placeholder={"USD Price"}
              value={copy_usd}
              readOnly
            />
            <h3>EUR: with 60% </h3>
            <Input
              onClick={copyEur}
              placeholder={"EUR Price"}
              value={copy_eur}
              readOnly
            />
            <h3>CYN: with 60% </h3>
            <Input
              onClick={copyCny}
              placeholder={"EUR Price"}
              value={copy_cny}
              readOnly
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TextTransformer;
