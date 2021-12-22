# example only - use "seml" for production
#./osl '#+ forall ' '#+ ' forall.ohm forall.osl <in.md >preprocessed.md
clear
osldir=`pwd`
#${osldir}/osl.js '#+ forall ' '#+ ' forall.ohm forall.osl --support=${osldir}/support.js --tracing <in.md 
#${osldir}/osl.js '#+ forall ' '#+ ' forall.ohm forall.osl --support=${osldir}/support.js --viewgen <in.md 
${osldir}/osl.js '#+ forall ' '#+ ' forall.ohm forall.osl --support=${osldir}/support.js <in.md 
