function VertexError(){}

VertexError = gi.Extends(ErrorInterface, VertexError);
VertexError.prototype.name ="vertexerror";
VertexError.prototype.msg = "VertexError: The parameters or the distance are wrong in the current vertex.";
VertexError.prototype.description = "The VertexError occurs where the method distance is undefined or the internal parameters are wrong";
