export const squareMeterKownCalculation = (squareMeter:number, priceBySquareMeter:number):number => {
  return squareMeter*priceBySquareMeter
}

export const squareMeterUnkownCalculation = (totalVigotaQuantity:number, totalVigotaSize:number, productInteration:number):number => {
  return totalVigotaQuantity * totalVigotaSize * productInteration
}

export const freightCalculation = (distanceInKm:number, pricePerKm:number):number => {
  return distanceInKm * pricePerKm
}