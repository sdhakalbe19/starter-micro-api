var http = require('http');
http.createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`)
    res.write("\
% Input the parameter\n\
Cost=[5 2 4 3; 6 4 9 5; 2 3 8 1];\n\
\n\
A=[30 40 55]; % supply\n\
B=[15 20 40 50]; % demand\n\
% To check unbalanced/balanced problem\n\
if sum(A)==sum(B)\n\
    fprintf('Given problem is a Balanced T.P.')\n\
else\n\
    fprintf('Given problem is unbalanced')\n\
    if sum(A)<sum(B)\n\
        Cost(end+1,:)=zeros(1,size(B,2))\n\
        A(end+1)=sum(B)-sum(A)\n\
    elseif sum(A)>sum(B)\n\
        Cost(:,end+1)=zeros(1,size(A,2))\n\
        B(end+1)=sum(A)-sum(B)\n\
    end\n\
end\n\
ICost=Cost\n\
X=zeros(size(Cost)); % initial allocation\n\
[m , n]=size(Cost);  % finding the number of rows and column\n\
BFS=m+n-1\nfor i=1:size(Cost,1) \n\
    for j=1:size(Cost,2)\n\
        hh=min(Cost(:))   % For finding minimum cost value \n\
   [Row_index, Col_index]=find(hh==Cost)\n\
   % For finding the position of minimum cost cell\n\
   x11=min(A(Row_index),B(Col_index));\n\
   [Value, index]=max(x11); % for finding maximum allocation\n\
   ii=Row_index(index) % To indentify row position\n\
   jj=Col_index(index) % To indentify column position\n\
   y11=min(A(ii),B(jj)) % For finding the value\n\
   X(ii, jj)=y11;\n\
   A(ii)=A(ii)-y11;\n\
   B(jj)=B(jj)-y11;\n\
   Cost(ii, jj)=Inf\n\
    end\n\
end\n\
\n\
fprintf('Initial BFS = \n')\n\
IBFS=array2table(X)\n\
disp(IBFS)\n\
% To check for degenrate and non-degenerate\n\
TotalBFS=length(nonzeros(X))\n\
if TotalBFS==BFS\n\
    fprintf('The initial BFS is non-degenerate solution')\n\
else\n\
    fprintf('The initial BFS is Degenerate \n')\n\
end\n\
% Compute the initial transportation Cost\n\
Trans_Cost=sum(sum(ICost.*X))\n\
fprintf('Initial BFS Cost is = %d \n', Trans_Cost)");");
    res.end();
}).listen(process.env.PORT || 3000);
