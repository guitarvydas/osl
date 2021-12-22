# example only - use "seml" for production
#./osl '#+ forall ' '#+ ' forall.ohm forall.osl <in.md >preprocessed.md
osldir=`pwd`
${osldir}/osl.js '#+ forall ' '#+ ' forall.ohm forall.osl --support=${osldir}/support.js --tracing --viewGeneratedCode <in.md 
