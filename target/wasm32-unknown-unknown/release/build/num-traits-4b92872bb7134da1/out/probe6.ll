; ModuleID = 'probe6.6ce11eb0-cgu.0'
source_filename = "probe6.6ce11eb0-cgu.0"
target datalayout = "e-m:e-p:32:32-p10:8:8-p20:8:8-i64:64-n32:64-S128-ni:1:10:20"
target triple = "wasm32-unknown-unknown"

; core::f64::<impl f64>::is_subnormal
; Function Attrs: inlinehint nounwind
define internal zeroext i1 @"_ZN4core3f6421_$LT$impl$u20$f64$GT$12is_subnormal17he5230be15579486eE"(double %self) unnamed_addr #0 {
start:
  %_2 = alloca i8, align 1
  %0 = alloca i8, align 1
; call core::f64::<impl f64>::classify
  %1 = call i8 @"_ZN4core3f6421_$LT$impl$u20$f64$GT$8classify17hfcbcc443b811f00bE"(double %self) #2, !range !0
  store i8 %1, ptr %_2, align 1
  %2 = load i8, ptr %_2, align 1, !range !0, !noundef !1
  %_4 = zext i8 %2 to i32
  %3 = icmp eq i32 %_4, 3
  br i1 %3, label %bb3, label %bb2

bb3:                                              ; preds = %start
  store i8 1, ptr %0, align 1
  br label %bb4

bb2:                                              ; preds = %start
  store i8 0, ptr %0, align 1
  br label %bb4

bb4:                                              ; preds = %bb3, %bb2
  %4 = load i8, ptr %0, align 1, !range !2, !noundef !1
  %5 = trunc i8 %4 to i1
  ret i1 %5
}

; probe6::probe
; Function Attrs: nounwind
define hidden void @_ZN6probe65probe17h9c03bc3b16d2c3d7E() unnamed_addr #1 {
start:
; call core::f64::<impl f64>::is_subnormal
  %_1 = call zeroext i1 @"_ZN4core3f6421_$LT$impl$u20$f64$GT$12is_subnormal17he5230be15579486eE"(double 1.000000e+00) #2
  ret void
}

; core::f64::<impl f64>::classify
; Function Attrs: nounwind
declare dso_local i8 @"_ZN4core3f6421_$LT$impl$u20$f64$GT$8classify17hfcbcc443b811f00bE"(double) unnamed_addr #1

attributes #0 = { inlinehint nounwind "target-cpu"="generic" }
attributes #1 = { nounwind "target-cpu"="generic" }
attributes #2 = { nounwind }

!0 = !{i8 0, i8 5}
!1 = !{}
!2 = !{i8 0, i8 2}
