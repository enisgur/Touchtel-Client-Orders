export const searchFunc = async (st, parts, states) => {
  const {
    setComponentLoading,
    setFilterStatusData,
    setIsStatusFiltered,
  } = states;

  setComponentLoading(true);
  setFilterStatusData([]);

  let stat = 0;

  if (st !== "0") {
    stat = st - 1;
    const part = await parts.filter((p) => {
      return p.status === String(stat);
    });

    if (part) {
      setFilterStatusData([]);

      await part.map((p) => {
        let newObj = {
          id: p._id ? p._id : "",
          status: p.status
            ? p.status === "0"
              ? "Ordered"
              : p.status === "1"
              ? "Shipped"
              : p.status === "2" && "Done"
            : "",
          date: p.date ? p.date.split("T")[0] : "",
          estimate: p.shipping.edate ? p.shipping.edate.split("T")[0] : "",
          from: p.detail.supplier.company ? p.detail.supplier.company : "",
          device: p.detail.device.name ? p.detail.device.name : "",
          model: p.detail.model ? p.detail.model : "",
          part: p.detail.part ? p.detail.part : "",
          customer: p.customer.name ? p.customer.name : "",
          phone: p.customer.phone ? p.customer.phone : "",
        };

        return setFilterStatusData((f) => [...f, newObj]);
      });
      setIsStatusFiltered(true);
    }

    setComponentLoading(false);
  } else {
    await setComponentLoading(true);
    await setFilterStatusData([]);
    await setIsStatusFiltered(false);
    await setComponentLoading(false);

    // console.log("asdasd ", dataParts);
  }
};

export const getPartsbyDate = async (year, month, states, actions) => {
  const { setComponentLoading, setDataParts } = states;

  const { getPartsbyMonth } = actions;

  if (year && month) {
    // console.log("start");
    setComponentLoading(true);
    setDataParts([]);

    // const res = await getParts();
    const res = await getPartsbyMonth(year, month);

    if (res) {
      await res.map((p) => {
        // let newObj = {
        //   ...p.shipping,
        //   ...p.detail,
        //   ...p.finance,
        //   ...p.customer,
        //   ...p.user,
        //   isStore: p.isStore,
        // };

        let newObj = {
          id: p._id,
          status: p.status
            ? p.status === "0"
              ? "Ordered"
              : p.status === "1"
              ? "Shipped"
              : p.status === "2" && "Done"
            : "",
          date: p.date ? p.date.split("T")[0] : "",
          estimate: p.shipping.edate ? p.shipping.edate.split("T")[0] : "",
          from: p.detail.supplier.company ? p.detail.supplier.company : "",
          device: p.detail.device.name ? p.detail.device.name : "",
          model: p.detail.model ? p.detail.model : "",
          part: p.detail.part ? p.detail.part : "",
          customer: p.customer.name ? p.customer.name : "",
          phone: p.customer.phone ? p.customer.phone : "",
        };

        setDataParts((f) => [...f, newObj]);
        // console.log(newObj);
        return newObj;
      });
    }

    // console.log("done");
    setComponentLoading(false);
  }
};

// FOR ACCESSORIES

export const getAccessoriesbyDate = async (year, month, states, actions) => {
  const { setComponentLoading, setDataAccessories } = states;

  const { getAccessoriesbyMonth } = actions;

  if (year && month) {
    // console.log("start");
    setComponentLoading(true);
    setDataAccessories([]);

    // const res = await getParts();
    const res = await getAccessoriesbyMonth(year, month);

    if (res) {
      await res.map((p) => {
        // let newObj = {
        //   ...p.shipping,
        //   ...p.detail,
        //   ...p.finance,
        //   ...p.customer,
        //   ...p.user,
        //   isStore: p.isStore,
        // };

        let newObj = {
          id: p._id,
          status: p.status
            ? p.status === "0"
              ? "Ordered"
              : p.status === "1"
              ? "Shipped"
              : p.status === "2" && "Done"
            : "",
          date: p.date ? p.date.split("T")[0] : "",
          estimate: p.shipping.edate ? p.shipping.edate.split("T")[0] : "",
          from: p.detail.supplier.company ? p.detail.supplier.company : "",
          device: p.detail.device.name ? p.detail.device.name : "",
          model: p.detail.model ? p.detail.model : "",
          accessory: p.detail.accessory ? p.detail.accessory : "",
          customer: p.customer.name ? p.customer.name : "",
          phone: p.customer.phone ? p.customer.phone : "",
        };

        setDataAccessories((f) => [...f, newObj]);
        // console.log(newObj);
        return newObj;
      });
    }

    // console.log("done");
    setComponentLoading(false);
  }
};

export const searchFuncAccessory = async (st, accessories, states) => {
  const {
    setComponentLoading,
    setFilterStatusData,
    setIsStatusFiltered,
  } = states;

  setComponentLoading(true);
  setFilterStatusData([]);

  let stat = 0;

  if (st !== "0") {
    stat = st - 1;
    const accessory = await accessories.filter((p) => {
      return p.status === String(stat);
    });

    if (accessory) {
      setFilterStatusData([]);

      await accessory.map((p) => {
        let newObj = {
          id: p._id ? p._id : "",
          status: p.status
            ? p.status === "0"
              ? "Ordered"
              : p.status === "1"
              ? "Shipped"
              : p.status === "2" && "Done"
            : "",
          date: p.date ? p.date.split("T")[0] : "",
          estimate: p.shipping.edate ? p.shipping.edate.split("T")[0] : "",
          from: p.detail.supplier.company ? p.detail.supplier.company : "",
          device: p.detail.device.name ? p.detail.device.name : "",
          model: p.detail.model ? p.detail.model : "",
          accessory: p.detail.accessory ? p.detail.accessory : "",
          customer: p.customer.name ? p.customer.name : "",
          phone: p.customer.phone ? p.customer.phone : "",
        };

        return setFilterStatusData((f) => [...f, newObj]);
      });
      setIsStatusFiltered(true);
    }

    setComponentLoading(false);
  } else {
    await setComponentLoading(true);
    await setFilterStatusData([]);
    await setIsStatusFiltered(false);
    await setComponentLoading(false);

    // console.log("asdasd ", dataaccessories);
  }
};

// async function filterPart(st) {
//   setComponentLoading(true);
//   setFilterStatusData([]);

//   let stat = 0;
//   // console.log("asdasd : ", status, stat);

//   if (st !== "0") {
//     stat = st - 1;
//     const part = await parts.filter(function (part) {
//       return part.status === String(stat);
//     });

//     if (part) {
//       await part.map((p) => {
//         // let newObj = {
//         //   ...p.shipping,
//         //   ...p.detail,
//         //   ...p.finance,
//         //   ...p.customer,
//         //   ...p.user,
//         //   isStore: p.isStore,
//         // };

//         let newObj = {
//           id: p._id,
//           date: p.date ? p.date.split("T")[0] : "",
//           estimate: p.shipping.edate ? p.shipping.edate.split("T")[0] : "",
//           from: p.detail.supplier ? p.detail.supplier : "",
//           device: p.detail.device ? p.detail.device : "",
//           model: p.detail.model ? p.detail.model : "",
//           part: p.detail.part ? p.detail.part : "",
//           customer: p.customer.name ? p.customer.name : "",
//           phone: p.customer.phone ? p.customer.phone : "",
//         };

//         setFilterStatusData((f) => [...f, newObj]);
//         // console.log(newObj);
//         return newObj;
//       });

//       setIsStatusFiltered(true);
//     }

//     console.log(part);
//     setComponentLoading(false);
//   } else {
//     console.log("else");

//     // setIsStatusFiltered(false);
//     // getPartsbyDate(year, month);
//     setFilterStatusData([]);
//     setComponentLoading(false);
//     setIsStatusFiltered(false);

//     console.log("asdasd ", dataParts);

//     // return dataParts;
//   }
// }

// GETPARTSBYDATE

// async function getPartsbyDate(year, month) {
//     if (year && month) {
//       // console.log("start");
//       setComponentLoading(true);
//       setDataParts([]);

//       // const res = await getParts();
//       const res = await getPartsbyMonth(year, month);

//       if (res) {
//         await res.map((p) => {
//           // let newObj = {
//           //   ...p.shipping,
//           //   ...p.detail,
//           //   ...p.finance,
//           //   ...p.customer,
//           //   ...p.user,
//           //   isStore: p.isStore,
//           // };

//           let newObj = {
//             id: p._id,
//             date: p.date ? p.date.split("T")[0] : "",
//             estimate: p.shipping.edate ? p.shipping.edate.split("T")[0] : "",
//             from: p.detail.supplier ? p.detail.supplier : "",
//             device: p.detail.device ? p.detail.device : "",
//             model: p.detail.model ? p.detail.model : "",
//             part: p.detail.part ? p.detail.part : "",
//             customer: p.customer.name ? p.customer.name : "",
//             phone: p.customer.phone ? p.customer.phone : "",
//           };

//           setDataParts((f) => [...f, newObj]);
//           // console.log(newObj);
//           return newObj;
//         });
//       }

//       // console.log("done");
//       setComponentLoading(false);
//     }
//   }
