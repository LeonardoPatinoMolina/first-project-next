"use strict"
import React, { useState, useEffect } from "react";

export const usePagination = (args) => {
  const [loot, setloot] = useState({
    charge: !args ? [] : args,
    results: !args ? [] : args.slice(0, 6),
    currentP: 1,
    totalResults: args ? args.length : 0,
  });
  const AMOUNT = 6;
  let minCut;
  let maxCut;

  function jumpCharge(page){
    maxCut = parseInt(page) * AMOUNT;
    minCut = maxCut - AMOUNT;
    const newResults = args.slice(minCut, maxCut);
    setloot({
      ...loot,
      results: newResults,
      currentP: parseInt(page)
    });
  }
  const reset = ()=>{
    setloot({
      charge: [],
    results: [],
    currentP: 1,
    totalResults: 0,
    })
  };
  const toPage = (page) => jumpCharge(page);
  return { toPage, loot, reset };
};
